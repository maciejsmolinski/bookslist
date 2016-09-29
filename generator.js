/**
 * Generate random data to operate on in the application
 *
 * Usage:
 *
 *   // Generate 100K of records, store in data folder
 *   node generator.js
 */

/**
 * Store global settings (e.g. number of records to generate,
 * how many batches to generate data in etc.)
 */
const settings = {
  numberOfRecords: 100000, // 100K
  numberOfBatches: 100,
};

/**
 * Chance.js is a random number / data generator
 */
const chance = require('chance').Chance();

const data = {
  genres: [
    'action', 'animation', 'comedy',
    'documentary', 'family', 'horror',
    'musical', 'financial', 'sport',
    'fantasy', 'history', 'thriller',
  ],
  genders: [
    'female', 'male',
  ],
  names: {
    male: [
      'Leonard', 'Sheldon', 'Howard', 'Rajesh', 'Stuart',
    ],
    female: [
      'Penny', 'Amy', 'Bernadette',
    ],
  },
  lastNames: [
    'Hofstadter', 'Cooper',
    'Wolowitz', 'Koothrappali',
    'Rostenkowski', 'Farrah Fowler', 'Bloom',
  ],
};

const record = () => {
  const authorGender = chance.pickone(data.genders);
  const authorFirst = chance.pickone(data.names[authorGender]);
  const authorLast = chance.pickone(data.lastNames);

  return {
    name: chance.sentence({ words: 5 }),
    author: {
      name: `${authorFirst} ${authorLast}`,
      gender: authorGender,
    },
    genre: chance.pickone(data.genres),
    published: chance.timestamp(),
  };
};

/**
 * Use ES6 Generators to generate data in batches
 *
 * Sample Usage:
 *
 *   // Generate 1000 records in 10 batches (100 at a time) using `record` mapping function:
 *
 *     const record = () => ({ name: 'Sample Record' });
 *     const generator = generateInBatches(1000, 10, record);
 *
 *     for (let batch in generator) {
 *       console.log(batch); // 100 records generated at a time
 *     }
 */
const generateInBatches = function * (numberOfRecords, numberOfBatches, mapping) {
  const batchSize = numberOfRecords / numberOfBatches;

  while (numberOfBatches--) {
    yield Array.from(Array(batchSize), mapping);
  }
};

/**
 * Generate 100K records in 100 batches (1K at a time)
 */
const generator = generateInBatches(settings.numberOfRecords, settings.numberOfBatches, record);

/**
 * Use database service, when connection is established (database loaded), insert records
 */
require('./services/db')().then(connection => {
  // Get existing collection or create a new one
  const books = connection.getCollection('books') || connection.addCollection('books');

  for (let batch of generator) {
    books.insert(batch);
  }

  connection.saveDatabase(() =>
    console.log(
      `${settings.numberOfRecords} records saved in ${settings.numberOfBatches} batches`
    )
  );
  connection.close();
});

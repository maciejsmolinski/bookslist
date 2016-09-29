/**
 * Chance.js is a random number / data generator
 */
const chance = require('chance').Chance();

/**
 * Store global settings (e.g. number of records to generate, how many batches to generate data in etc.)
 */
const settings = {
  numberOfRecords: 1000000, // 1 million
  numberOfBatches: 1000,
};

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
  const bookGenre = chance.pickone(data.genres);
  const authorGender = chance.pickone(data.genders);
  const authorName = `${chance.pickone(data.names[authorGender])} ${chance.pickone(data.lastNames)}`;
  const bookName = chance.sentence({ words: 5 });

  return {
    name: bookName,
    author: {
      name: authorName,
      gender: authorGender,
    },
    genre: bookGenre,
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
 * Generate 1000000 records in 1000 batches (1000 at a time)
 */
const generator = generateInBatches(settings.numberOfRecords, settings.numberOfBatches, record);

/**
 * Iterate and save to database every batch
 */
for (let batch of generator) {
  console.log(batch);
}

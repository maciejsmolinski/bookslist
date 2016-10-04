/**
 * Services serve generic purpose, they either do something or hold something.
 */

const Loki = require('lokijs');

/**
 * Database Service. Establishes connection to the database
 * and returns a connection promise that resolves once database from file is loaded
 *
 *   Sample Usage:
 *
 *   const databaseService = require('./services/db');
 *
 *   databaseService().then(connection => {
 *     const books = connection.getCollection('books');
 *     const horrors = books.find({ genre: 'horror' });
 *
 *     console.log(`${horrors.length} horrors found!`);
 *
 *     connection.close();
 *   });
 *
 * @return  {Promise}  Connection promise. When fulfilled, resolves with connection
 */
const connectionPromise = () =>

  (new Promise((resolve, reject) => {
    const connection = new Loki('./data/books.json', {
      autoload: true,
      autoloadCallback: () => resolve(connection),
    });

  }));

module.exports = connectionPromise;

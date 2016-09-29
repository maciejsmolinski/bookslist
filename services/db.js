const Loki = require('lokijs');

/**
 * Database Service. Returns a connection promise
 *
 *   Sample Usage:
 *
 *   const databaseService = require('./services/db');
 *
 *   databaseService().then((connection) => {
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

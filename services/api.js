class Api {
  constructor () {
    this.connection = require('./db')();
  }

  /**
   * Generic method that allows to query database and its collections easily
   *
   * ::query(collection:String, query:Object, limit:Number, page:Number)
   *
   * Sample Usage:
   *
   *   // Query for first 15 comedy books published by female authors
   *
   *   api.query(
   *     'books',                                                          // Collection
   *     { $and: [{ 'author.gender': 'female' }, { 'genre': 'comedy' }] }, // Query
   *     15,                                                               // Limit
   *     1                                                                 // Page
   *   )
   *   .then(...)
   *   .catch(...)
   *
   * @return {Promise}
   */
  query(collection, query = {}, limit = 10, page = 1) {
    if (!collection) {
      return Promise.reject(new Error(
        `Api::query expected "collection" to be non-empty string. Received "${collection}" (${typeof collection}) instead`
      ));
    }

    if (!query) {
      return Promise.reject(new Error(
        `Api::query expected "query" to be an object. Received "${query}" (${typeof query}) instead`
      ));
    }

    if (typeof limit !== 'number') {
      return Promise.reject(new Error(
        `Api::query expected "limit" to be a number. Received "${limit}" (${typeof limit}) instead`
      ));
    }

    if (typeof page !== 'number') {
      return Promise.reject(new Error(
        `Api::query expected "page" to be a number. Received "${page}" (${typeof page}) instead`
      ));
    }

    return this.connection.then(connection => {
      const offset = (page - 1) * limit;

      return connection
               .getCollection(collection)
               .chain()
               .find(query)
               .offset(offset)
               .limit(limit)
               .data()
               ;
    });

  }

  /**
   * Get books by genre
   *
   * ::byGenre(genre:String, limit:Number, page:Number)
   *
   * Sample Usage:
   *
   *   // Get first 10 horror books
   *   api.byGenre('horror').then(...).catch(...);
   *
   *   // Get 20 comedy books starting from page 2
   *   api.byGenre('comedy', 20, 2).then(...).catch(...);
   *
   * @return {Promise}
   */
  byGenre (genre = 'all', limit = 10, page = 1) {
    if (!genre) {
      return Promise.reject(new Error(
        `Api::byGenre expected "genre" to be non-empty string. Received "${genre}" (${typeof genre}) instead`
      ));
    }

    // 'all' means no genre filtering
    const query = genre === 'all' ? { } : { genre };

    return this.query('books', query, limit, page);
  }

  /**
   * Get books by genre
   *
   * ::byAuthorGender(gender:String("male"|"female"), limit:Number, page:Number)
   *
   * Sample Usage:
   *
   *   // Get first 10 books written by female authors
   *   api.byAuthorGender('female').then(...).catch(...);
   *
   *   // Get 20 books written by male authors starting from page 2
   *   api.byAuthorGender('male', 20, 2).then(...).catch(...);
   *
   * @return {Promise}
   */
  byAuthorGender (gender = 'all', limit = 10, page = 1) {
    if (['male', 'female', 'all'].indexOf(gender) === -1) {
      return Promise.reject(new Error(
        `Api::byAuthorGender expected "gender" to be "all", "male" or "female". Received "${gender}" (${typeof gender}) instead`
      ));
    }

    // 'all' means no genre filtering
    const query = gender === 'all' ? { } : { 'author.gender': gender };

    return this.query('books', query, limit, page);
  }
}

module.exports = new Api();

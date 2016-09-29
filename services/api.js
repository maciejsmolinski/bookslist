class Api {
  constructor () {
    this.connection = require('./db')();
  }

  query(collection, query, limit = 10, page = 1) {
    if (!collection) {
      return Promise.reject(new Error(
        `Api::query expected "collection" to be non-empty string. Received "${collection}" (${typeof collection}) instead`
      ));
    }

    if (!query || typeof query === 'string' || Object.keys(query).length === 0) {
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
  byGenre (genre = '', limit = 10, page = 1) {
    if (!genre) {
      return Promise.reject(new Error(
        `Api::byGenre expected "genre" to be non-empty string. Received "${genre}" (${typeof genre}) instead`
      ));
    }

    return this.query('books', { genre }, limit, page);
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
   *   api.byAuthorGender('comedy', 20, 2).then(...).catch(...);
   *
   * @return {Promise}
   */
  byAuthorGender (gender = '', limit = 10, page = 1) {
    if (['male', 'female'].indexOf(gender) === -1) {
      return Promise.reject(new Error(
        `Api::byAuthorGender expected "gender" to be either "male" or "female". Received "${gender}" (${typeof gender}) instead`
      ));
    }

    return this.query('books', { 'author.gender': gender }, limit, page);
  }
}

module.exports = new Api();

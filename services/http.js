const superagent = require('superagent');

/**
 * Mimic database querying API via HTTP
 */
class Http {
  constructor () {
    this.base = '/api';
  }

  /**
   * Generic method that allows to query HTTP API
   *
   * ::query(method:String)
   *
   * Sample Usage:
   *
   *   // Query newest books
   *   http.query('newest').then(...).catch(...)
   *
   *   // Query second page of the horror books listing
   *   http.query('genre/horror/2').then(...).catch(...)
   *
   * @return {Promise}
   */
  query (method) {
    if (!method) {
      return Promise.reject(new Error(
        `Http::query expected "method" to be non-empty string. Received "${method}" (${typeof method}) instead`
      ));
    }

    return new Promise((resolve, reject) => {
      superagent
        .get(`${this.base}/${method}`)
        .end((error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.body);
          }
        });
    });
  }

  /**
   * Get newest books
   *
   * ::newest(limit:Number)
   *
   * Sample Usage:
   *
   *   // Get newest books
   *   http.newest().then(...).catch(...);
   *
   * @return {Promise}
   */
  newest () {
    return this.query('newest');
  }

  /**
   * Get books by genre
   *
   * ::byGenre(genre:String, page:Number)
   *
   * Sample Usage:
   *
   *   // Get first 10 horror books
   *   http.byGenre('horror').then(...).catch(...);
   *
   *   // Get second 10 horror books
   *   http.byGenre('horror', 2).then(...).catch(...);
   *
   * @return {Promise}
   */
  byGenre (genre = '', page = 1) {
    if (!genre) {
      return Promise.reject(new Error(
        `Http::byGenre expected "genre" to be non-empty string. Received "${genre}" (${typeof genre}) instead`
      ));
    }

    if (typeof page !== 'number') {
      return Promise.reject(new Error(
        `Http::byGenre expected "page" to be a number. Received "${page}" (${typeof page}) instead`
      ));
    }

    return this.query(`genre/${genre}/${page}`);
  }

  /**
   * Get books by genre
   *
   * ::byAuthorGender(gender:String("male"|"female"), page:Number)
   *
   * Sample Usage:
   *
   *   // Get first 10 books written by female authors
   *   api.byAuthorGender('female').then(...).catch(...);
   *
   *   // Get second 10 books written by male authors
   *   api.byAuthorGender('male', 2).then(...).catch(...);
   *
   * @return {Promise}
   */
  byAuthorGender (gender = '', page = 1) {
    if (['male', 'female'].indexOf(gender) === -1) {
      return Promise.reject(new Error(
        `Http::byAuthorGender expected "gender" to be either "male" or "female". Received "${gender}" (${typeof gender}) instead`
      ));
    }

    if (typeof page !== 'number') {
      return Promise.reject(new Error(
        `Http::byAuthorGender expected "page" to be a number. Received "${page}" (${typeof page}) instead`
      ));
    }

    return this.query(`gender/${gender}/${page}`);
  }
}

module.exports = new Http();

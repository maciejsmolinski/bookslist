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
   * Get books by genre
   *
   * ::search(
   *   maleOrFemale:String("male"|"female"|"all"),
   *   bookGenre:String("all"|"comedy"|"horror"|...),
   *   sortAuthorName:String("none"|"desc"|"asc"),
   *   sortBookName:String("none"|"desc"|"asc"),
   *   page:Number
   * )
   *
   * Sample Usage:
   *
   *   // Get first 10 books by any author / any genre / no sorting
   *   http.search('all', 'all', 'none', 'none', 1);
   *
   *   // Get first 10 books by female authors / horror genre / sort by authorName Z-A / sort by book name A-Z
   *   http.search('female', 'horror', 'desc', 'asc', 1);
   *
   * @return {Promise}
   */
  search (maleOrFemale = 'all', bookGenre = 'all', sortAuthorName = 'none', sortBookName = 'none', page = 1) {
    if (['all', 'male', 'female'].indexOf(maleOrFemale) === -1) {
      return Promise.reject(new Error(`
        Http::search expected "maleOrFemale" to be "all", "male" or "female".
        Received "${maleOrFemale}" (${typeof maleOrFemale}) instead
      `));
    }

    if (['all', 'action', 'animation', 'comedy', 'documentary', 'family', 'fantasy', 'financial', 'history', 'horror', 'musical', 'sport', 'thriller',].indexOf(bookGenre) === -1) {
      return Promise.reject(new Error(`
        Http::search expected "bookGenre" to be "all", "action", "animation", "comedy", "documentary", "family", "fantasy", "financial", "history", "horror", "musical", "sport" or "thriller".
        Received "${bookGenre}" (${typeof bookGenre}) instead
      `));
    }

    if (['none', 'desc', 'asc'].indexOf(sortAuthorName) === -1) {
      return Promise.reject(new Error(`
        Http::search expected "sortAuthorName" to be "none", "desc" or "asc".
        Received "${sortAuthorName}" (${typeof sortAuthorName}) instead
      `));
    }

    if (['none', 'desc', 'asc'].indexOf(sortBookName) === -1) {
      return Promise.reject(new Error(`
        Http::search expected "sortBookName" to be "none", "desc" or "asc".
        Received "${sortBookName}" (${typeof sortBookName}) instead
      `));
    }

    if (typeof page !== 'number') {
      return Promise.reject(new Error(`
        Http::byGenre expected "page" to be a number.
        Received "${page}" (${typeof page}) instead
      `));
    }

    return this.query(`${maleOrFemale}/${bookGenre}/${sortAuthorName}/${sortBookName}/${page}`);
  }

}

module.exports = new Http();

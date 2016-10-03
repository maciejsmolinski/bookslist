class Api {
  constructor () {
    this.connection = require('./db')();

    this.allowedGenres = [
      'all',
      'action',
      'animation',
      'comedy',
      'documentary',
      'family',
      'fantasy',
      'financial',
      'history',
      'horror',
      'musical',
      'sport',
      'thriller',
    ];

    this.allowedGenders = [
      'all',
      'male',
      'female',
    ];
  }

  /**
   * Get books by complex query criteria (filter / sort / limit / offset)
   *
   *   ::search(filters:Array, sort:Array, limit:Number, page:Number)
   *
   * Sample Usage:
   *
   *   // Find first 10 horror books written by male writers
   *   api.search(
   *     [
   *       { type: 'genre', value: 'horror' }
   *       { type: 'author.gender', value: 'male' }
   *     ],                                        // genre=horror,author.gender=male filtering in place
   *     []                                        // no sorting options in place
   *     10,                                       // limit set to 10 records
   *     1                                         // first page
   *   ).then(...).catch(...);
   *
   *   // Find first 10 books, order by author name Z-A
   *   api.search(
   *     [],                                       // no filtering in place
   *     [
   *       { type: 'author.name', value: 'desc' }
   *     ]                                         // Z-A author.name ordering
   *     10,                                       // limit set to 10 records
   *     1                                         // first page
   *   ).then(...).catch(...);
   *
   * @return {Promise}
   */
  search(filters = [], sort = [], limit = 10, page = 1) {
    /**
     * Start with basic validation
     * Return rejecting promise as soon as some parameters violate rules
     */
    if (filters.some(item => ['genre', 'author.gender'].indexOf(item.type) === -1)) {
      return Promise.reject(new Error(`
        Api::search expected "filters" to have either "genre" or "author.gender" types.
        Received "${JSON.stringify(filters)}" (${typeof filters}) instead
      `));
    }

    if (filters.some(item => item.type === 'genre' && this.allowedGenres.indexOf(item.value) === -1)) {
      return Promise.reject(new Error(`
        Api::search expected "genre" value to be one of the following: ${this.allowedGenres}.
        Received "${JSON.stringify(filters)}" (${typeof filters}) instead
      `));
    }

    if (filters.some(item => item.type === 'author.gender' && this.allowedGenders.indexOf(item.value) === -1)) {
      return Promise.reject(new Error(`
        Api::search expected "gender" value to be one of the following: ${this.allowedGenders}.
        Received "${JSON.stringify(filters)}" (${typeof filters}) instead
      `));
    }

    if (sort.some(item => ['name', 'author.name'].indexOf(item.type) === -1)) {
      return Promise.reject(new Error(`
        Api::search expected "sort" to be either "name" or "author.name".
        Received "${JSON.stringify(sort)}" (${typeof sort}) instead
      `));
    }

    if (typeof limit !== 'number') {
      return Promise.reject(new Error(`
        Api::search expected "limit" to be a number.
        Received "${limit}" (${typeof limit}) instead
      `));
    }

    if (typeof page !== 'number') {
      return Promise.reject(new Error(`
        Api::search expected "page" to be a number.
        Received "${page}" (${typeof page}) instead
      `));
    }

    /**
     * If none of the parameters broke the rules,
     * return query promise
     */
    return this.connection.then(connection => {
      const offset = (page - 1) * limit;

      /**
       * Keep a reference to base query so that filters / sorting
       * can be applied on top of it
       */
      let baseQuery = connection.getCollection('books').chain();

      /**
       * Remove filters that do not amend search results (value=all)
       * join them with `AND` strategy
       */
      if (filters.length) {
        baseQuery = baseQuery
                      .find({
                        $and: filters
                                .filter(filter => filter.value !== 'all')
                                .map(filter => {
                                  return {
                                    [filter.type]: filter.value
                                  };
                                })
                      })
                      ;
      }

      /**
       * Apply either simplesort(property, isDesc:Boolean) for non-nested sorting
       * or use sort(comparison:Function) for nested property sorting
       */
      if (sort.length) {
        sort
          .filter(item => item.value !== 'none')
          .forEach(item => {
              if (item.type === 'author.name') {
                baseQuery = baseQuery.sort((item1, item2) => {
                  if (item1.author.name < item2.author.name) {
                    return item.value === 'asc' ? -1 : 1;
                  }
                  if (item1.author.name > item2.author.name) {
                    return item.value === 'asc' ? 1 : -1;
                  }
                  return 0;
                });
              } else {
                baseQuery = baseQuery.simplesort(item.type, item.value === 'desc');
              }
          });
      }

      /**
       * Query data using previously defined filters and sorting rules
       * with specified offset and limit (pagination)
       */
      return baseQuery
               .offset(offset)
               .limit(limit)
               .data()
               ;
    });

  }
}

module.exports = new Api();

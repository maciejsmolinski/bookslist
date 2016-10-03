const api = require('../../services/http');

const initial = {
  isLoading: false,
  error: '',
  list: [],
  filters: {
    genre: 'all',
    gender: 'all',
    sortAuthorName: 'none',
    sortBookName: 'none',
    available: {
      genre: [
        'all', 'action', 'animation', 'comedy',
        'documentary', 'family', 'fantasy',
        'financial', 'history', 'horror',
        'musical', 'sport', 'thriller',
      ],
      gender: ['all', 'female', 'male'],
    }
  },
  page: 1,
};

module.exports = {
  namespace: 'books',
  state: initial,
  reducers: {

    /**
     * send('books:clear', done);
     */
    clear: () => initial,

    /**
     * send('books:loading', done);
     */
    loading: () => ({ isLoading: true }),

    /**
     * send('books:loaded', done);
     */
    loaded: () => ({ isLoading: false, error: '' }),

    /**
     * send('books:error', 'Custom Error Message', done);
     */
    error: (error) => ({ error }),

    /**
     * send('books:list', [ listOfBooks ], done);
     */
    list: (list) => ({ list }),

    /**
     * send('books:listAppend', [ listOfBooks ], done);
     */
    listAppend: (list, state) => ({ list: [].concat(state.list, list) }),

    /**
     * send('books:nextPage', done);
     */
    nextPage: (_, state) => ({ page: state.page + 1 }),

    /**
     * send('books:updateFilters', { newFilter }, done);
     */
    updateFilters: (filter, state) => {
      const filters = Object.assign({}, initial.filters, filter);

      return Object.assign({}, state, { filters });
    },

  },
  effects: {
    failure: (message, state, send, done) => {
      const error = `Failed to load books. There's been an error calling the API`;

      send('books:clear', done);
      send('books:error', error, done);
      send('error', error, done);
    },

    fetch: (options, state, send, done) => {
      if (state.isLoading) {
        return;
      }

      if (state.error) {
        return;
      }

      // Clear only when not in `append` mode
      if (!options || !options.append) {
        send('books:clear', done);
      }

      send('books:loading', done);

      // If in `append` mode, increase page number
      if (options && options.append) {
        send('books:nextPage', done);
      }

      api
        .search(
          state.filters.gender,
          state.filters.genre,
          state.filters.sortAuthorName,
          state.filters.sortBookName,
          state.page
        )
        .then(books => {
          send(options && options.append ? 'books:listAppend' : 'books:list', books, done);
          send('books:loaded', done);
        })
        .catch((error) => send('books:failure', error, done))
        ;
    },

    changeFilters: (filter, state, send, done) => {
      send('books:updateFilters', filter, done);
      send('books:list', [], done);
      send('books:fetch', { append: true }, done);
    },

  },
  subscriptions: [],
};

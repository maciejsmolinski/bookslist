const api = require('../../services/http');

const initial = {
  isLoading: false,
  error: '',
  list: [],
  filters: {
    genre: 'all',
    gender: 'all',
  },
  sorting: {
    genre: false,
    author: false,
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
    nextPage: (_, state) => ({ page: state.page + 1 })

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

      send('books:clear', done);
      send('books:loading', done);

      // If append request sent, increase page number
      if (options && options.append) {
        send('books:nextPage', done);
      }

      api
        .byGenre('horror', state.page)
        .then(books => {
          send(options && options.append ? 'books:listAppend' : 'books:list', books, done);
          send('books:loaded', done);
        })
        .catch((error) => send('books:failure', error, done))
        ;
    },

  },
  subscriptions: [],
};

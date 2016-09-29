const api = require('../../services/http');

const initial = {
  isLoading: false,
  error: '',
  list: [],
  newest: [],
  filters: {
    genre: 'all',
    gender: 'all',
  },
  sorting: {
    genre: false,
    author: false,
  },
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
     * send('books:newest', [ listOfBooks ], done);
     */
    newest: (newest) => ({ newest }),

    /**
     * send('books:list', [ listOfBooks ], done);
     */
    list: (list) => ({ list }),

  },
  effects: {
    failure: (message, state, send, done) => {
      const error = `Failed to load books. There's been an error calling the API`;

      send('books:clear', done);
      send('books:error', error, done);
      send('error', error, done);
    },

    fetch: (data, state, send, done) => {
      if (state.isLoading) {
        return;
      }

      if (state.error) {
        return;
      }

      send('books:clear', done);
      send('books:loading', done);

      /**
       * Make sure both requests complete
       * before dispatching events
       */
      Promise
        .all([
          api.newest(),
          api.byGenre('horror'),
        ])
        .then(([newest, books]) => {
          send('books:newest', newest, done);
          send('books:list', books, done);
          send('books:loaded', done);
        })
        .catch((error) => send('books:failure', error, done))
        ;
    },
  },
  subscriptions: [],
};

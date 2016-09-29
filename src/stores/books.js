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
     * send('books:loading', null, done);
     */
    loading: (_, ...state) => ({ state, isLoading: true }),

    /**
     * send('books:error', 'Custom Error Message', done);
     */
    error: (message, ...state) => ({ state, error: message }),

    /**
     * send('books:update', [ listOfBooks ], done);
     */
    update: (books, ...state) => ({
      list: books,
      isLoading: false,
      error: '',
    }),

  },
  effects: {
    failure: (message, state, send, done) => {
      const error = `Failed to load books. There's been an error calling the API`;

      send('books:clear', {}, done);
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

      send('books:clear', null, done);
      send('books:loading', null, done);

      Promise.resolve([
        {
          name: 'The Lord of the Rings',
          genre: 'fantasy',
          author: { name: 'J. R. R. Tolkien', gender: 'male' },
          published: (+ new Date()),
        },
        {
          name: 'One Hundred Years of Solitude',
          genre: 'fantasy',
          author: { name: 'Gabriel García Márquez', gender: 'male' },
          published: (+ new Date()),
        },
        {
          name: 'Brave New World',
          genre: 'documentary',
          author: { name: 'ldous Huxley', gender: 'male' },
          published: (+ new Date()),
        }

      ])
        .then(books => send('books:update', books, done))
        .catch((error) => send('books:failure', error, done))
        ;
    },
  },
  subscriptions: [],
};

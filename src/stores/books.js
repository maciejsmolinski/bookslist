const api = require('../../services/http');
const ENUM = require('../../services/enum');

const initial = {
  books: {
    isLoading: false,
    error: '',
    list: [],
    filters: {
      genre: 'all',
      gender: 'all',
      sortAuthorName: 'none',
      sortBookName: 'none',
      available: {
        genre: ENUM.genres.map(genre => ({ label: genre, value: { genre } })),
        gender: ENUM.genders.map(gender => ({ label: gender, value: { gender } })),
        sorting: [
          { label: 'Default sorting', value: { sortAuthorName: 'none', sortBookName: 'none' } },
          { label: 'Author Name: A-Z', value: { sortAuthorName: 'asc', sortBookName: 'none' } },
          { label: 'Author Name: Z-A', value: { sortAuthorName: 'desc', sortBookName: 'none' } },
          { label: 'Book Name: A-Z', value: { sortAuthorName: 'none', sortBookName: 'asc' } },
          { label: 'Book Name: Z-A', value: { sortAuthorName: 'none', sortBookName: 'desc' } },
        ]
      }
    },
    page: 1,
  }
};

module.exports = (state, emitter) => {
  Object.assign(state, initial);

  // Reducers

  /**
   * emit('books:clear');
   */
  emitter.on('books:clear', () => Object.assign(state, initial));

  /**
   * emit('books:loading');
   */
  emitter.on('books:loading', () => Object.assign(state.books, { isLoading: true }));

  /**
   * emit('books:loaded');
   */
  emitter.on('books:loaded', () => Object.assign(state.books, { isLoading: false, error: '' }));

  /**
   * emit('books:error', 'Custom Error Message');
   */
  emitter.on('books:error', (error) => Object.assign(state.books, { error }));

  /**
   * emit('books:list', [ listOfBooks ]);
   */
  emitter.on('books:list', (list) => Object.assign(state.books, { list }));

  /**
   * emit('books:listAppend', [ listOfBooks ]);
   */
  emitter.on('books:listAppend', (list) => Object.assign(state.books, { list: [].concat(state.books.list, list) }));

  /**
   * emit('books:nextPage');
   */
  emitter.on('books:nextPage', () => (state.books, { page: state.books.page + 1 }));

  /**
   * emit('books:updateFilters', { newFilter });
   */
  emitter.on('books:updateFilters', (filter) => {
    const filters = Object.assign({}, state.books.filters, filter);

    return Object.assign(state.books, { filters });
  });

  // Effects

  emitter.on('books:failure', (message) => {
    const error = `Failed to load books. There's been an error calling the API`;

    emitter.emit('books:clear');
    emitter.emit('books:error', error);
    emitter.emit('error', error);

    emitter.emit('render')
  });

  emitter.on('books:fetch', (options) => {
    if (state.books.isLoading) {
      return;
    }

    if (state.books.error) {
      return;
    }

    // Clear only when not in `append` mode
    if (!options || !options.append) {
      emitter.emit('books:clear');
    }

    emitter.emit('books:loading');
    emitter.emit('render');

    api
      .search(
        state.books.filters.gender,
        state.books.filters.genre,
        state.books.filters.sortAuthorName,
        state.books.filters.sortBookName,
        options && options.append ? state.books.page + 1 : state.books.page
      )
      .then(books => {
        emitter.emit(options && options.append ? 'books:listAppend' : 'books:list', books);
        emitter.emit('books:loaded');

        if (options && options.append) {
          emitter.emit('books:nextPage');
        }
        emitter.emit('render');
      })
      .catch((error) => {
        emitter.emit('books:failure', error);
      })
      ;
  });

  emitter.on('books:changeFilters', (filter) => {
    emitter.emit('books:updateFilters', filter);
    emitter.emit('books:list', []);
    emitter.emit('books:fetch', { append: true });
  });

};

module.exports.initial = initial;
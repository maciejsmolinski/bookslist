const html = require('choo/html');
const canEmit = !(module && module.parent);

const topSection = require('./partials/top-section');
const booksList = require('./partials/books-list');
const filters = require('./partials/filters');

module.exports = (state, emit) => {
  const { errors, books, params } = state;

  if (canEmit && !books.list.length) {
    emit('books:fetch');
  }

  /*
  * Lazy Loading:
  *
  * Watch until eighth element from the end enters the screen
  * When it does, request additional data (lazy load)
  */
  if (canEmit && books.list.length && !books.isLoading) {
    const selector = '.books-list .book-tile:nth-last-child(8)';
    const observer = new IntersectionObserver((entries = []) => {
        if (entries.find(entry => entry.isIntersecting)) {
          observer.unobserve(document.querySelector(selector));
          emit('books:fetch', { append: true });
        }
    });

    // Wait for event loop to finish working on DOM, then start observing
    setTimeout(() => observer.observe(document.querySelector(selector)));
  }

  return html`
    <main data-app>

      ${topSection()}

      ${filters(books.filters, emit)}

      ${books.list.length ? booksList(books.list) : html``}

      ${errors.map(error => html`<div class="indicator indicator--warning">${error}</div>`)}

      ${books.isLoading ? html`<div class="indicator">loading...</div>` : html``}

    </main>
  `;
};

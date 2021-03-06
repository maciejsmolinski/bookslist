const html = require('choo/html');
const canSend = !(module && module.parent);

const topSection = require('./partials/top-section');
const booksList = require('./partials/books-list');
const filters = require('./partials/filters');

module.exports = (state, previousState, send) => {
  const { errors, books, params } = state;

  if (canSend && !books.list.length) {
    send('books:fetch');
  }

  /*
  * Lazy Loading:
  *
  * Watch until eighth element from the end enters the screen
  * When it does, request additional data (lazy load)
  */
  if (books.list.length && !books.isLoading) {
    const selector = '.books-list .book-tile:nth-last-child(8)';
    const observer = new IntersectionObserver(() => {
        observer.unobserve(document.querySelector(selector));
        send('books:fetch', { append: true });
    });

    // Wait for event loop to finish working on DOM, then start observing
    setTimeout(() => observer.observe(document.querySelector(selector)));
  }

  return html`
    <main data-app>

      ${topSection()}

      ${filters(books.filters, send)}

      ${books.list.length ? booksList(books.list) : html``}

      ${errors.map(error => html`<div class="indicator indicator--warning">${error}</div>`)}

      ${books.isLoading ? html`<div class="indicator">loading...</div>` : html``}

    </main>
  `;
};

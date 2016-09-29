const html = require('choo/html');
const canSend = !(module && module.parent);

const topSection = require('./partials/top-section');
const booksList = require('./partials/books-list');

module.exports = (state, previousState, send) => {
  const { errors, books, params } = state;

  if (canSend && !books.list.length) {
    send('books:fetch');
  }

  return html`
    <main data-page="books">

      ${errors.length ? html`<div>Errors found: ${errors}!</div>` : html``}

      ${topSection(books.newest)}
      ${booksList(books.list)}

    </main>
  `;
};

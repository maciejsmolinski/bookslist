const html = require('choo/html');
const canSend = !(module && module.parent);

module.exports = (state, previousState, send) => {
  const { errors, books, params } = state;

  if (canSend && !books.list.length) {
    send('books:fetch');
  }

  return html`
    <main data-page="books">

      ${errors.length ? html`<div>Errors found!</div>` : html``}

      <p>Number of books: ${books.list.length}</p>
      <p>Loading: ${books.isLoading}</p>

    </main>
  `;
};

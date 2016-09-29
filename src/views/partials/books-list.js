const html = require('choo/html');
const bookTile = require('./book-tile');

module.exports = (books) =>
  html`

    <section class="books-list">
      <h1 class="books-list__heading">
        All Books
      </h1>
      <div class="books-list__tiles">
        ${books.map(bookTile)}
      </div>
    </section>

  `;

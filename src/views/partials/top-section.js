const html = require('choo/html');
const bookTile = require('./book-tile');

module.exports = (books) =>
  html`

    <section class="top-section">

      <h1 class="header">
        books<span class="header--emphasis">list</span>
      </h1>

      <div class="promoted-books">
        <h1 class="promoted-books__heading">
          Popular This Week
        </h1>

        <div class="promoted-books__tiles">
          ${books.map(bookTile)}
        </div>
      </div>

    </section>

  `;

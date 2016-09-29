const html = require('choo/html');
const bookTile = require('./book-tile');

module.exports = () =>
  html`

    <section class="top-section">
      <h1 class="header">
        books<span class="header--emphasis">list</span>
      </h1>
    </section>

  `;

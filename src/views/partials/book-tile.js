const html = require('choo/html');
const date = require('./date');

module.exports = (book) =>
  html`

    <div class="book-tile">
      <img src="/images/cover.jpg"
           class="book-tile__cover"
           alt="${book.name}">
      <p class="book-tile__details">
        <span class="book-tile__title">
          ${book.name}
        </span>
        <span class="book-tile__author-line">
          by ${book.author.name} (${book.author.gender})
        </span>

        <span class="book-tile__genre">
          Genre: ${book.genre}
        </span>
        <span class="book-tile__publication">
          Published: ${date(book.published * 1000)}
        </span>
      </p>
    </div>

  `;

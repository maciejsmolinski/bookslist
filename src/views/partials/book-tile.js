const html = require('choo/html');
const date = require('./date');

// Helper function to check books agains specials definitions (indication)
const specials = require('../helpers/specials');
const slug = (text) => String(text).toLowerCase().replace(/\W/g, '-');

module.exports = (book) =>
  html`

    <div class="book-tile ${specials(book).map(special => `book-tile--${special}`)}">
      <img src="/images/genre/${slug(book.genre)}.jpg"
           class="book-tile__cover"
           alt="${book.name}">
      <p class="book-tile__details">
        <span class="book-tile__title">
          ${book.name}
        </span>
        <span class="book-tile__author-line book-tile__author-line--${book.author.gender}">
          by ${book.author.name}
        </span>

        <span class="book-tile__tag">
          ${book.genre}
        </span>
        <span class="book-tile__tag">
          Published: ${date(book.published * 1000)}
        </span>
      </p>
    </div>

  `;

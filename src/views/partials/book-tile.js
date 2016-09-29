const html = require('choo/html');

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
          by ${book.author.name}
        </span>
      </p>
    </div>

  `;

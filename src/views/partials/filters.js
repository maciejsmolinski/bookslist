const html = require('choo/html');

module.exports = () =>
  html`

    <section class="filters">

      <div class="filters__item">
        <strong>Sort by:</strong>
        <span>Author Gender: A-Z</span>
        |
        <span>Book Genre: None</span>
      </div>

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Book Genre:
          </strong>
          <select>
            ${
              [
                'all', 'action', 'animation', 'comedy',
                'documentary', 'family', 'fantasy',
                'financial', 'history', 'horror',
                'musical', 'sport', 'thriller',
              ].map((option) => html`<option>${option}</option>`)
            }
          </select>
        </label>
      </div>

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Author Gender:
          </strong>
          <select>
            ${
              ['all', 'male', 'female'].map((option) => html`<option>${option}</option>`)
            }
          </select>
        </label>
      </div>

    </section>

  `;

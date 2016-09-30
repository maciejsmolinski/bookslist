const html = require('choo/html');

module.exports = () =>
  html`

    <section class="filters">

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Sort by:
          </strong>
          <select class="filters__options">
            <option>---</option>
            <option>Author Gender: Female First</option>
            <option>Author Gender: Male First</option>
            <option>Genre: A-Z</option>
            <option>Genre: Z-A</option>
          </select>
        </label>
      </div>

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Book Genre:
          </strong>
          <select class="filters__options">
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
          <select class="filters__options">
            ${
              ['all', 'female', 'male'].map((option) => html`<option>${option}</option>`)
            }
          </select>
        </label>
      </div>

    </section>

  `;

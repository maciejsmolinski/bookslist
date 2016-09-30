const html = require('choo/html');

module.exports = (filters) =>
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
            ${filters.available.genre.map((option) => html`<option>${option}</option>`)}
          </select>
        </label>
      </div>

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Author Gender:
          </strong>
          <select class="filters__options">
            ${filters.available.gender.map((option) => html`<option>${option}</option>`)}
          </select>
        </label>
      </div>

    </section>

  `;

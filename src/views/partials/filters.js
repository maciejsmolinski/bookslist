const html = require('choo/html');

module.exports = (filters, send) => {

  const onChange = (event) => {
    const dropdown = event.target;
    const selected = dropdown[dropdown.selectedIndex];

    const filter = (() => {
      try {
        return JSON.parse(selected.dataset.filter);
      } catch (_) {
        return {};
      }
    })();

    send('books:changeFilters', filter);
  };

  return html`

    <section class="filters">

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Sort by:
          </strong>
          <select class="filters__options" onchange=${onChange}>
            <option data-filter='{ "sortAuthorName": "none", sortBookName: "none" }'>
              Default sorting
            </option>
            <option data-filter='{ "sortAuthorName": "asc", "sortBookName": "none" }'>
              Author Name: A-Z
            </option>
            <option data-filter='{ "sortAuthorName": "desc", "sortBookName": "none" }'>
              Author Name: Z-A
            </option>
            <option data-filter='{ "sortAuthorName": "none", "sortBookName": "asc" }'>
              Book Name: A-Z
            </option>
            <option data-filter='{ "sortAuthorName": "none", "sortBookName": "desc" }'>
              Book Name: Z-A
            </option>
          </select>
        </label>
      </div>

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Show Genres:
          </strong>
          <select class="filters__options" onchange=${onChange}>
            ${filters.available.genre.map((option) => html`
              <option data-filter='{ "genre": "${option}" }'>${option}</option>
            `)}
          </select>
        </label>
      </div>

      <div class="filters__item">
        <label>
          <strong class="filters__label">
            Show Author Genders:
          </strong>
          <select class="filters__options" onchange=${onChange}>
            ${filters.available.gender.map((option) => html`
              <option data-filter='{ "gender": "${option}" }'>${option}</option>
            `)}
          </select>
        </label>
      </div>

    </section>

  `;

};

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
            <option>---</option>
            <option data-filter='{ "sortAuthorName": "asc" }'>Author Name: A-Z</option>
            <option data-filter='{ "sortAuthorName": "desc" }'>Author Name: Z-A</option>
            <option data-filter='{ "sortBookName": "asc" }'>Book Name: A-Z</option>
            <option data-filter='{ "sortBookName": "desc" }'>Book Name: Z-A</option>
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

}

const html = require('choo/html');
const filter = require('./filter');

module.exports = (filters, emit) => {

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

    emit('books:changeFilters', filter);
  };

  return html`

    <section class="filters">

      ${filter('Show Genres', filters.available.genre, onChange)}
      ${filter('Show Author Genders:', filters.available.gender, onChange)}
      ${filter('Sort by:', filters.available.sorting, onChange)}

    </section>

  `;

};

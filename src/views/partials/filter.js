const html = require('choo/html');
const bookTile = require('./book-tile');

module.exports = (label, options, onChange) =>
  html`

    <div class="filters__item">
      <label>
        <strong class="filters__label">
          ${label}
        </strong>
        <select class="filters__options" onchange=${onChange}>
          ${options.map(option => html`
            <option data-filter='${JSON.stringify(option.value)}'>${option.label}</option>
          `)}
        </select>
      </label>
    </div>

  `;

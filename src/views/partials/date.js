const html = require('choo/html');

module.exports = (timestamp = (+new Date())) => {
  const date      = (new Date(timestamp));
  const datetime  = date.toISOString();
  const format    = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const formatted = format.format(date);

  return html`<time datatime=${datetime}>${formatted}</time>`;
};

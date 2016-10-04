const html = require('choo/html');

/**
 * Returns <time> tag with locally formatted date based on the given timestamp.
 * If no timestamp is provided, current date is used.
 *
 * Sample Usage:
 *
 *   date();               // Retrieves current date
 *   date(1475599511247);  // Renders <time> tag for specified date
 *
 *   // Outputs (en-US):
 *   // <time datetime="2016-10-04T16:45:11.247Z">10/4/2016</time>
 *   //
 *   // Outputs (en-GB):
 *   // <time datetime="2016-10-04T16:45:11.247Z">04/10/2016</time>
 *
 */
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

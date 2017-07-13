const choo = require('choo');
const app = choo();

app.use(require('./stores/app'));
app.use(require('./stores/books'));

app.route('/', require('./views/main'));

if (module && module.parent) {
  module.exports = app;
} else {
  document.body.replaceChild(app.start(), document.querySelector('[data-app]'));
}

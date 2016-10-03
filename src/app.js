const choo = require('choo');
const app = choo();

app.model(require('./stores/app'));
app.model(require('./stores/books'));

app.router((route) => [
  route('/', require('./views/main')),
]);

if (module && module.parent) {
  module.exports = app;
} else {
  document.body.replaceChild(app.start(), document.querySelector('[data-app]'));
}

const port = process.env.PORT || 4242;
const serve = require('koa-static');
const router = require('koa-router')();
const server = require('koa')();
const client = require('./src/app');
const template = require('fs').readFileSync('./index.html', { encoding: 'utf-8' });
const layout = (contents) => template.replace('<body>', `<body>${contents}`);

const api = require('./services/api');

// Static Assets Serving (from `/`)
server.use(serve('./dest'));

// API Generic Search Route
router.get('/api/:maleOrFemale/:bookGenre/:sortAuthorName/:sortBookName/:page?', function * () {
  const genderFilters = [{ type: 'author.gender', value: this.params.maleOrFemale }];
  const genreFilters = [{ type: 'genre', value: this.params.bookGenre }];
  const authorSorting = [{ type: 'author.name', value: this.params.sortAuthorName }];
  const bookNameSorting = [{ type: 'name', value: this.params.sortBookName }];

  const filters = [].concat(genderFilters, genreFilters);
  const sorting = [].concat(authorSorting, bookNameSorting);

  try {
    this.body = yield api.search(filters, sorting, 10, Number(this.params.page) || 1);
  } catch (error) {
    // Keep error details in response headers for detailed explanation what happened
    this.set('X-Error-Details', String(error.message).replace(/\s+/g, ' '));

    // Set Internal Server Error HTTP Header
    this.status = 500;

    // Return a json-formatted message
    this.body = {
      status: 'error',
    };
  }
});

// Main Request Handler: Serve index.html with pre-rendered client app with empty state
router.get('/', function * () {
  this.body = layout(client.toString(this.path));
});

// Bind routes to koa server
server.use(router.routes());

// Warm up database/api connection once event loop is free
process.nextTick(() => {
  require('./services/api')
    .connection
    .then(() => console.log('Database warmed up (loaded)'));
});

// Listen on previously specified port
server.listen(port, () =>
  console.log(`Application ready and listens for requests on port ${port}`)
);

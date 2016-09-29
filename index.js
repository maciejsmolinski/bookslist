const port = process.env.PORT || 4242;
const serve = require('koa-static');
const server = require('koa')();
const layout = require('fs').readFileSync('./index.html', { encoding: 'utf-8' });

// Static Assets Serving (from `/`)
server.use(serve('./dest'));

// Main Request Handler
server.use(function * () {
  // Ignore jshint shouting about missing yield (we don't need to pass execution somewhere else)
  // jshint -W124
  this.body = layout; // Simply serve index.html contents
});

server.listen(port, () =>
  console.log(`Application ready and listens for requests on port ${port}`)
);

# BooksList

A simple, responsive, JS-based (Node.js / Front-End / Database) project focused on using modern browser APIs to achieve great results with minimal effort.

![](https://cdn.pbrd.co/images/aNgeUDJoO.png)

# Requirements

Node.js is required in order to build and run the application.
Preferred 6.x.x version.
You can download Node.js from https://nodejs.org/en/

# Setup

Install dependencies with `npm install`

# Generate Data

* Download pre-generated set of records with `curl https://maciejsmolinski.com/books.json > data/books.json`
* Alternatively, generate 100K of books data with `node generator.js`.
* If you want to generate 1 million records, please use the following command: `for i in {1..10}; do node --max_old_space_size=4096 generator.js; done` instead (please notice increased heap size flag)

# Workflow

* Compile all assets once with `npm run build` or compile and watch for file changes with `npm run watch`
* Run the application server with `npm start` (localhost:4242)
or `PORT=3131 npm start` to run the server on a specified port (in this case localhost:3131)
* During development, it is recommended to use `nodemon` (`nodemon index.js`)
so that the server reloads automatically when changes are being made in the project's directory.

# Technological Choices

To make things simple and self-contained thus easy to setup, the application is fully JavaScript based including the server, the client as well as the database.

* **Database**: [`Loki.js`](lokijs.org/) - [`MongoDB-like`](https://www.mongodb.com) JS based server supporting in-memory db as well as hard-durability (file storage). It comes at a cost (e.g. speed) thus production-ready database is suggested for production site. Database warms up once server routes are setup so that the first request can be handled much quicker.
* **Server**: [`Node.js`](https://nodejs.org/) / [`Koa.js`](http://koajs.com) - a simple server framework supporting ES6 generators that make asynchronous operations look like they were synchronous (thus easier to maintain and debug)
* **Front-End**: [`Choo.js`](https://github.com/yoshuawuyts/choo) - Fully-Featured Reactive Client-Side framework supporting Routing + Push State / Redux-like stores / Effects / Subscriptions / Least possible changes to the DOM tree ([`Morphdom`](https://github.com/patrick-steele-idem/morphdom)) out of the box. Framework with a clean [Elm-like](https://guide.elm-lang.org/architecture/) architecture in mind.
* **Lazy Loading**: [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Since the application is heavy on data (1m records), in order to load the application quickly lazy loading must have been used. In order to achieve best performance as well as future standards-compliance, IntersectionObserver along with a polyfill have been used.
* **Localization**: [`Intl.* APIs`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) - in order to format dates based on user preferences (browser locale), [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) browser API was utilised thus date is going to be displayed differently for `de-DE` (`4.10.2016`) locale and differently for `en-US` for example (`10/4/2016`)
* **Preprocessing**: [`Gulp`](http://gulpjs.com) - to keep things simple and easy to understand, [`Gulp`](http://gulpjs.com) has been used. Its pipeline config is much easier to understand at first look as opposed to [`Grunt`](http://gruntjs.com) which made it an obvious choice for the project of this size. [`Gulp`](http://gulpjs.com) might be more difficult to debug than [`Grunt`](http://gruntjs.com) for newcomers though.
* **Bundling**: [`Webpack`](https://webpack.github.io) - in order to share code easily between front-end and the back-end, modern bundling tools can be used. [`Webpack`](https://webpack.github.io) makes it a no-brainer. The advantage of [`webpack`](https://webpack.github.io) over several other bundling solutions (like [`rollup`](http://rollupjs.org), [`jspm`](http://jspm.io) etc.) is that it makes the process fairly straightforward. Plenty plugins / loaders are available out there. Thanks to webpack, ES6 syntax could be used.
* **Isomorphism**: Thanks to [`webpack`](https://webpack.github.io) bundling and [`Choo.js`](https://github.com/yoshuawuyts/choo) architecture, some of the code could have been shared between the front-end and the back-end resulting in basic layout being rendered before the scripts load (rather than blank page)
* **Styles**: [`SASS`](http://sass-lang.com) and [`Autoprefixer`](https://github.com/postcss/autoprefixer) - thanks to [`SASS`](http://sass-lang.com), the code can be split into smaller chunks and some repetition can be avoided. Thanks to [`autoprefixer`](https://github.com/postcss/autoprefixer) , the output code will always be compatible with most common browsers (vendor prefixes applied to CSS based on current usage statistics)

# Errors handling

Since the application is API based, most of the potential errors during development might come from the API requests.
The convention used in this application is to return a simple JSON object with the error status and hide details from most of the users.

For development purposes though, you can inspect error details in HTTP `X-Error-Details` header, see:

![HTTP Header Containing API error details](https://cdn.pbrd.co/images/15MvYCoHs.png)

# Presentation

Business Requirements:

* Indicate horror books published on Halloween (31 Oct)
* Indicate financial books published on the last friday of any month
* Filter books by author gender (male/female)
* Filter books by book genre (action/comedy/horror/etc)
* Sort book by author name A-Z | Z-A
* Sort book by book name A-Z | Z-A

## Book Tiles

### Book Tile - No Indication

![Book Tile - No Indication](https://cdn.pbrd.co/images/aMpSvUQXx.png)

### Book Tile - Halloween Special

![Book Tile - Halloween Special](https://cdn.pbrd.co/images/aMqfOoryg.png)

### Book Tile - Financial Special

![Book Tile - Financial Special](https://cdn.pbrd.co/images/aMqNDhmYZ.png)

## Filters

### Filters - All

![All Filters](https://cdn.pbrd.co/images/aMrielNXb.png)

### Filters - Genre Filter

![Genre Filter](https://cdn.pbrd.co/images/aMrOSydxq.png)

### Filters - Gender Filter

![Gender Filter](https://cdn.pbrd.co/images/aMsiKMLmW.png)

### Filters - Sorting Options

![Sorting Options](https://cdn.pbrd.co/images/aMsEStDDx.png)

## Responsiveness: Mobile-First

![Responsiveness: Mobile-First](https://cdn.pbrd.co/images/14QBd7K4e.gif)

## Performance: Lazy Loading

![Performance: Lazy Loading](https://cdn.pbrd.co/images/aO4YuDlVn.gif)

# Additional Questions

Please feel free to raise any questions with me either using issues or reach directly me on twitter [@maciejsmolinski](https://twitter.com/maciejsmolinski)

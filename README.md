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

* Generate 100K of books data with `node generator.js`.
* If you want to generate 1 million records, please use the following command: `for i in {1..10}; do node --max_old_space_size=4096 generator.js; done` instead (please notice increased heap size flag)
* Alternatively, download pre-generated set of records with `curl https://maciejsmolinski.com/books.json > data/books.json`

# Workflow

* Compile all assets once with `npm run build` or compile and watch for file changes with `npm run watch`
* Run the application server with `npm start` (localhost:4242)
or `PORT=3131 npm start` to run the server on a specified port (in this case localhost:3131)
* During development, it is recommended to use `nodemon` (`nodemon index.js`)
so that the server reloads automatically when changes are being made in the project's directory.

# Technological Choices

To make things simple and self-contained thus easy to setup, the application is fully JavaScript based including the server, the client as well as the database.

* Database: [`Loki.js`](lokijs.org/) - `MongoDB-like` JS based server supporting in-memory db as well as hard-durability (file storage). It comes at a cost (e.g. speed) thus production-ready database is suggested for production site.
* Server: [`Node.js`](https://nodejs.org/) / [`Koa.js`](http://koajs.com) - a simple server framework supporting ES6 generators that make asynchronous operations look like they were synchronous (thus easier to maintain and debug)
* Front-End: [`Choo.js`](https://github.com/maciejsmolinski/bookslist.git) - Fully-Featured Reactive Client-Side framework supporting Routing + Push State / Redux-like stores / Effects / Subscriptions / Least possible changes to the DOM tree (Morphdom) out of the box. Framework with a clean [Elm-like](https://guide.elm-lang.org/architecture/) architecture in mind.
* Lazy Loading: IntersectionObserver - Since the application is heavy on data (1m records), in order to load the application quickly lazy loading must have been used. In order to achieve best performance as well as future standards-compliance, IntersectionObserver along with a polyfill have been used.
* Localization: [`Intl.* APIs`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) - in order to format dates based on user preferences (browser locale), `Intl.DateTimeFormat` browser API was utilised thus date is going to be displayed differently for `de-DE` (`4.10.2016`) locale and differently for `en-US` for example (`10/4/2016`)
* Preprocessing: [`Gulp`](http://gulpjs.com) - to keep things simple and easy to understand, `Gulp` has been used. Its pipeline config is much easier to understand at first look as opposed to `Grunt` which made it an obvious choice for the project of this size. `Gulp` might be more difficult to debug than `Grunt` for newcomers though.
* Bundling: [`Webpack`](https://webpack.github.io) - in order to share code easily between front-end and the back-end, modern bundling tools can be used. `Webpack` makes it a no-brainer. The advantage of `webpack` over several other bundling solutions (like `rollup`, `jspm` etc.) is that it makes the process fairly straightforward. Plenty plugins / loaders are available out there. Thanks to webpack, ES6 syntax could be used.

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

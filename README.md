# BooksList

A simple, responsive, JS-based (Node.js / Front-End / Database) project focused on using modern browser APIs to achieve great results with minimal effort.

![](https://cdn.pbrd.co/images/aNgeUDJoO.png)

## Requirements

Node.js is required in order to build and run the application.
Preferred 6.x.x version.
You can download Node.js from https://nodejs.org/en/

## Setup

* Install dependencies with `npm install`
* Download pre-generated set of records with `curl https://maciejsmolinski.com/books.json > data/books.json`
* Compile all assets once with `npm run build` or compile and watch for file changes with `npm run watch`
* Run the application server under [http://localhost:4242](http://localhost:4242) with `npm start`

## Setup - More Options

* To run the server on a specified port, run `PORT=<port> npm start`, e.g. `PORT=3131 npm start`
* To make your server reload whenever files change, it is recommended to use `nodemon` (`nodemon index.js`)

## Generate Your Own Data

The alternative to downloading data is to generate it yourself. Try the following:

* Generate 100K of books data with `node generator.js`.
* If you want to generate 1 million records, please use the following command: `for i in {1..10}; do node --max_old_space_size=4096 generator.js; done` instead (please notice increased heap size flag)

## Technological Choices

To make things simple and self-contained thus easy to setup, the application is fully JavaScript based including the server, the client as well as the database.

* **Database**: [`Loki.js`](lokijs.org/) - [`MongoDB-like`](https://www.mongodb.com) JS based server supporting in-memory storage as well as hard-durability (file storage). It comes at a cost (e.g. speed) thus production-ready database is suggested for production site. Database warms up once server routes are setup so that the first request can be handled much quicker.
* **Server**: [`Node.js`](https://nodejs.org/) / [`Koa.js`](http://koajs.com) - a simple server framework supporting ES6 generators that make asynchronous operations look like they were synchronous (thus easier to maintain and debug)
* **Front-End**: [`Choo.js`](https://github.com/yoshuawuyts/choo) - Fully-Featured Reactive Client-Side framework supporting Routing + Push State / Redux-like stores / Effects / Subscriptions / Least possible changes to the DOM tree ([`Morphdom`](https://github.com/patrick-steele-idem/morphdom)) out of the box. Framework with a clean [Elm-like](https://guide.elm-lang.org/architecture/) architecture in mind.
* **Lazy Loading**: [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Since the application is heavy on data (1m records), in order to load the application quickly lazy loading must have been used. In order to achieve best performance as well as future standards-compliance, IntersectionObserver along with a polyfill have been used.
* **Localization**: [`Intl.* APIs`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) - in order to format dates based on user preferences (browser locale), [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) browser API was utilised thus date is going to be displayed differently for `de-DE` (`4.10.2016`) locale and differently for `en-US` for example (`10/4/2016`)
* **Preprocessing**: [`Gulp`](http://gulpjs.com) - to keep things simple and easy to understand, [`Gulp`](http://gulpjs.com) has been used. Its pipeline config is much easier to understand at first look as opposed to [`Grunt`](http://gruntjs.com) which made it an obvious choice for the project of this size. [`Gulp`](http://gulpjs.com) might be more difficult to debug than [`Grunt`](http://gruntjs.com) for newcomers though.
* **Bundling**: [`Webpack`](https://webpack.github.io) - in order to share code easily between front-end and the back-end, modern bundling tools can be used. [`Webpack`](https://webpack.github.io) makes it a no-brainer. The advantage of [`webpack`](https://webpack.github.io) over several other bundling solutions (like [`rollup`](http://rollupjs.org), [`jspm`](http://jspm.io) etc.) is that it makes the process fairly straightforward. Plenty plugins / loaders are available out there. Thanks to webpack, ES6 syntax could be used.
* **Isomorphism**: Thanks to [`webpack`](https://webpack.github.io) bundling and [`Choo.js`](https://github.com/yoshuawuyts/choo) architecture, some of the code could have been shared between the front-end and the back-end resulting in basic layout being rendered before the scripts load (rather than blank page)
* **Styles**: [`SASS`](http://sass-lang.com) and [`Autoprefixer`](https://github.com/postcss/autoprefixer) - thanks to [`SASS`](http://sass-lang.com), the code can be split into smaller chunks and some repetition can be avoided. Thanks to [`autoprefixer`](https://github.com/postcss/autoprefixer) , the output code will always be compatible with most common browsers (vendor prefixes applied to CSS based on current usage statistics). [`BEM`](http://getbem.com/introduction/) combined with [`Single Responsibility CSS`](http://drewbarontini.com/articles/single-responsibility/) help to keep the code clean and modular.

## Errors handling

Since the application is API based, most of the potential errors during development might come from the API requests.
The convention used in this application is to return a simple JSON object with the error status and hide details from most of the users.

![JSON Error Response](https://cdn.pbrd.co/images/aXi3oKspH.png)

For development purposes though, you can inspect error details in HTTP `X-Error-Details` header, see:

![HTTP Header Containing API error details](https://cdn.pbrd.co/images/aXmDOWj2a.png)

## Presentation

Business Requirements:

* Indicate horror books published on Halloween (31 Oct)
* Indicate financial books published on the last friday of any month
* Filter books by author gender (male/female)
* Filter books by book genre (action/comedy/horror/etc)
* Sort books by author name A-Z | Z-A
* Sort books by book name A-Z | Z-A

### Book Tiles

#### Book Tile - No Indication

![Book Tile - No Indication](https://cdn.pbrd.co/images/aMpSvUQXx.png)

#### Book Tile - Halloween Special

![Book Tile - Halloween Special](https://cdn.pbrd.co/images/aMqfOoryg.png)

#### Book Tile - Financial Special

![Book Tile - Financial Special](https://cdn.pbrd.co/images/aMqNDhmYZ.png)

### Filters

#### Filters - All

![All Filters](https://cdn.pbrd.co/images/aMrielNXb.png)

#### Filters - Genre Filter

![Genre Filter](https://cdn.pbrd.co/images/aMrOSydxq.png)

#### Filters - Gender Filter

![Gender Filter](https://cdn.pbrd.co/images/aMsiKMLmW.png)

#### Filters - Sorting Options

![Sorting Options](https://cdn.pbrd.co/images/aMsEStDDx.png)

### Responsiveness: Mobile-First

![Responsiveness: Mobile-First](https://cdn.pbrd.co/images/14QBd7K4e.gif)

### Performance: Lazy Loading

![Performance: Lazy Loading](https://cdn.pbrd.co/images/aO4YuDlVn.gif)

## Potential further improvements

Thinking about production site, these are things that could be improved in order to make the app run smoothly on production environment:

* Add indexes in the database to speed up sophisticated searches (e.g. when filtering / sorting comes into play)
* Normalize data, use separate collections rather than nested documents and query things by reference
* Leverage browser caching by using [`Cache-Control` HTTP headers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=en)
* Use process manager such as [`PM2`](https://github.com/Unitech/pm2) to manage, start and restart processes without a hassle
* Minify CSS / JavaScript bundles to serve as small static assets as possible
* Instead of optimizing images manually, use tools such as [`gulp-imagemin`](https://github.com/sindresorhus/gulp-imagemin) and plug them into your assets pipeline
* Not only lazy load data on scroll but load also images whenever they enter the screen
* Use [`jsonld`](http://json-ld.org) / [`schema.org`](http://schema.org) to present data in a machine-readable way to the search engines. Plus manage page title and meta tags more intelligently.

The list of potential improvements is much longer, it might consist of `typed javascript` to make your code more bulletproof, `service workers` to make your app work at least partially offline, `web workers` to offload some work and process it in the background, using `jsdom` to potentially pre-render loaded app state rather than empty one, introducing more sophisticated `routing` so the app can load with pre-selected filters when loaded from bookmarks, better `error-handling` so that the app re-tries to request data again whenever the API failed or went down and plenty more.

## Additional Questions

Please feel free to raise any questions with me either using issues or reach directly me on twitter [@maciejsmolinski](https://twitter.com/maciejsmolinski)

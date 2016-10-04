# BooksList

A simple JS based (Node.js / Front-End / Database) project focused on using modern browser APIs to achieve great results with minimal effort.

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

* Database: Loki.js - MongoDB like JS based server supporting in-memory db as well as hard-durability (file storage). It comes at a cost (e.g. speed) thus production-ready database is suggested for production site.
* Server: Node.js / Koa.js - a simple server framework supporting ES6 generators that make asynchronous operations look like they were synchronous (thus easier to maintain and debug)
* Front-End: Choo.js - Fully-Featured Reactive Client-Side framework supporting Routing + Push State / Redux-like stores / Effects / Subscriptions / Least possible changes to the DOM tree (Morphdom) out of the box. Framework with a clean [Elm-like](https://guide.elm-lang.org/architecture/) architecture in mind.

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

# Additional Questions

Please feel free to raise any questions with me either using issues or reach directly me on twitter [@maciejsmolinski](https://twitter.com/maciejsmolinski)

# BooksList

Basic JavaScript / HTML5 project focused on using modern browser APIs to achieve great results with minimal effort.

# Requirements

Node.js is required in order to build and run the application.
Preferred 6.x.x version.
You can download Node.js from https://nodejs.org/en/

No external database is required. Loki.js is used instead in order to make things
simple to setup and still deliver great experience with mongodb-like API.
You can read more about Loki.js at http://lokijs.org/.
Keep in mind it comes at a cost (e.g. speed) so use production-ready database for your production site.

# Setup

Install dependencies with `npm install`
Generate 100K of books data with `node generator.js`.
If you want to generate 1 million records, use the following command `for i in {1..10}; do node --max_old_space_size=4096 generator.js; done` instead (please notice increased heap size flag)

# Workflow

Compile all assets once with `npm run build`.
Compile and watch for file changes with `npm run watch`

Run the application server with `npm start` (localhost:4242)
or `PORT=3131 npm start` to run the server on a specified port (in this case localhost:3131)

During development, it is recommended to use `nodemon` (`nodemon index.js`)
so that the server reloads automatically when changes are being made in the project's directory.

# Technological Choices

# Additional Questions

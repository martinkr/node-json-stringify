/**
 * The server component!
 * Renders the service.
 *
 * @example http://localhost:3000/
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

// change if you like
const port = 3000;

const express = require('express')
const app = express();

const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const compression = require('compression');

const path = require("path");

const randomdDecorator = require('./../shared/decorator-random.js');
const contentCreator = require('./../shared/creator-content.js');

// setup gzip
app.use(compression())

// setup app for parsing application/json
app.use(bodyParser.text());

// setup mustache for express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// setup static folders
app.use('/css', express.static(path.join(__dirname, './../static/css')))
app.use('/js', express.static(path.join(__dirname, './../static/js')))


/** basic route, GET */
app.get('/', (req, res) => {
	res.render('index.mustache', randomdDecorator(contentCreator(req)))
})

/** basic route, POST */
app.post('/', (req, res) => {
	res.render('index.mustache', randomdDecorator(contentCreator(req)))
})

// run!
app.listen(port, function () {
	// eslint-disable-next-line no-console
	console.log(`JSON-stringifier is listening on port ${port}. Visit: http://localhost:${port} while NODE_ENV is set to ${process.env.NODE_ENV }`);
})
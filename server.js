/**
 * A very basic service with one purpose: stringify a JSON object
 *
 * @requires
 *  - node > 4
 *  - express.js ^4
 *  - body-parser ^1.16.0
 *
 *
 * @example
 * $ node ./server.js
 * $ forever ./server.js
 * $ yarn start
 *
 * Example: http://localhost:3000/
 *
 * Copyright (c) 2016 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause github@mkrause.info
 */

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

// setup app for parsing application/json
app.use(bodyParser.text());


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');


/** basic route */
app.get('/', (req, res) => {
	res.render('templates/index.mustache', { 'data': '{"foo" : "bar" }', 'result' : "" });
	// res.send('<form style="" action="/" method="POST" enctype="text/plain"><textarea style="display: block; width: 500px; height: 250px" name="data"></textarea><button type="submit" style="display: block">Stringify</button></form>');
})

/** basic route */
app.post('/', (req, res) => {

	let _string = req.body.slice(5);
	let _result;

	// empty
	if (!_string) {
		res.render('index.pug', { 'data': '{"foo" : "bar" }', 'result' : "" });
		return;
	}

	try {
		_result = JSON.stringify(JSON.parse(_string));
		console.log("'" + _result + "'");
		res.render('templates/index.mustache', { 'data': '{"foo" : "bar" }', 'result' : _result });
	} catch (e) {
		res.render('templates/index.mustache', { 'data': '{"foo" : "bar" }', 'result' : e });
	}


})


app.listen(3000, function () {
	console.log('JSON-stringifier listening on port 3000!')
})

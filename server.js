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
const path = require("path");
const CUT = "input=".length;

// setup app for parsing application/json
app.use(bodyParser.text());


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use('/css', express.static(path.join(__dirname, '/static/css')))

/** basic route */
app.get('/', (req, res) => {
	res.render('index.mustache', { 'placeholder': '{"foo" : "bar" }', 'out' : "" });
	// res.send('<form style="" action="/" method="POST" enctype="text/plain"><textarea style="display: block; width: 500px; height: 250px" name="placeholder"></textarea><button type="submit" style="display: block">Stringify</button></form>');
})

/** basic route */
app.post('/', (req, res) => {

	let _string = req.body.slice(CUT);
	let _out;

console.log(req.body, "=>", _string)
	// empty
	if (!_string) {
		res.render('index.mustache', { 'placeholder': '{"foo" : "bar" }', 'out' : "" });
		return;
	}

	try {
		_out = "'"+JSON.stringify(JSON.parse(_string))+ "'";
		res.render('index.mustache', { 'placeholder': '{"foo" : "bar" }', 'out' : _out });
	} catch (error) {
		console.log("error", typeof(error))
		_out = error.toString();
		_out += "<hr />"


		var _errorPos = Number(error.toString().slice(error.toString().lastIndexOf(" ") + 1));
		if (_errorPos !== 0) {
			_out += _string.slice(0, _errorPos-1) + '<span class="jsny-error">' + _string.slice(_errorPos-1,_errorPos) + '</span>' + _string.slice(_errorPos);
		} else {
			_out += _string;
		}

		console.log("_out",_out)


		res.render('index.mustache', { 'placeholder': '{"foo" : "bar" }', 'out' : _out });
	}


})


app.listen(3000, function () {
	console.log('JSON-stringifier listening on port 3000!')
})

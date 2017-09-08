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
const colorMap = [
	"rgb(213, 0, 0)",
	"rgb(197, 17, 98)",
	"rgb(170, 0, 255)",
	"rgb(98, 0, 234)",
	"rgb(48, 79, 254)",
	"rgb(41, 98, 255)",
	"rgb(0, 145, 234)",
	"rgb(0, 200, 83)",
	"rgb(100, 221, 23)",
	"gb(255, 214, 0)",
	"gb(255, 171, 0)",
	"rgb(255, 109, 0)",
	"rgb(221, 44, 0)"
]

// setup app for parsing application/json
app.use(bodyParser.text());


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use('/css', express.static(path.join(__dirname, '/static/css')))

const _randomColor = () => colorMap[Math.floor(Math.random() * colorMap.length)];

/** basic route */
app.get('/', (req, res) => {
	res.render('index.mustache', {
		'placeholder': '{"foo" : "bar" }',
		'out': "",
		"theme": _randomColor()
	});
})

/** basic route */
app.post('/', (req, res) => {

	var _string, _out, _errorPos;

	_string = req.body.slice(CUT);

	// empty
	if (!_string) {
		res.render('index.mustache', {
			'placeholder': '{"foo" : "bar" }',
			'out': "",
			"theme": _randomColor()
		});
		return;
	}

	try {
		_out = "'" + JSON.stringify(JSON.parse(_string)) + "'";
		res.render('index.mustache', {
			'placeholder': '{"foo" : "bar" }',
			'out': _out,
			"theme": _randomColor()
		});
	} catch (error) {

		_out = error.toString();
		_out += "<hr />"

		_errorPos = Number(error.toString().slice(error.toString().lastIndexOf(" ") + 1));

		if (_errorPos !== 0) {
			_out += _string.slice(0, _errorPos - 1) + '<span class="jsny-error">' + _string.slice(_errorPos - 1, _errorPos) + '</span>' + _string.slice(_errorPos);
		} else {
			_out += _string;
		}

		res.render('index.mustache', {
			'placeholder': '{"foo" : "bar" }',
			'out': _out,
			"theme": _randomColor()
		});
	}

})


app.listen(3000, function () {
	console.log('JSON-stringifier listening on port 3000!')
})
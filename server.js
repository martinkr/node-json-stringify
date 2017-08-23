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

var express = require('express')
var app = express();
var bodyParser = require('body-parser');

// setup app for parsing application/json
app.use(bodyParser.text());
// use pu template
app.set('view engine', 'pug')


/** basic route */
app.get('/', function (req, res) {
	res.render('index', { title: 'Hey', message: 'Hello there!' })
	// res.send('<form style="" action="/" method="POST" enctype="text/plain"><textarea style="display: block; width: 500px; height: 250px" name="data"></textarea><button type="submit" style="display: block">Stringify</button></form>');
})

/** basic route */
app.post('/', function (req, res) {
	// res.json({"y":1});
	// console.log(req.body);
	var _string = req.body.slice(5);
	var _result;

	// empty
	if (!_string) {
		res.send('<form style="" action="/" method="POST" enctype="text/plain"><textarea style="display: block; width: 500px; height: 250px" name="data"></textarea><button type="submit" style="display: block">Stringify</button></form>');
		return;
	}

	try {
		_result = JSON.stringify(JSON.parse(_string));
		console.log("'" + _result + "'");
		req.body = "";
		res.send("<form style='' action='/' method='POST' enctype='text/plain'><textarea style='display: block; width: 500px; height: 250px' name='data'></textarea><button type='submit' style='display: block'>Stringify</button></form><br/>" + "'" + _result + "'");
	} catch (e) {
		console.log("'" + _result + "'");
		req.body = "";
		res.send("<form style='' action='/' method='POST' enctype='text/plain'><textarea style='display: block; width: 500px; height: 250px' name='data'></textarea><button type='submit' style='display: block'>Stringify</button></form><br/>" + e + "<br/>" + "no valid JSON");
	}


})


app.listen(3000, function () {
  console.log('JSON-stringifier listening on port 3000!')
})

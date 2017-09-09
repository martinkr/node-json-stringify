/**
 * @module shared/content-creator
 * @description
 * Creates the content object from the request object.
 * The content object contains all the information for the templating engine
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */
const paramName = "input=";
const placeholder = '{"foo" : "bar" }';
const empty = '';

/**
 * Returns a request object, generated from the DOM-nodes
 * and parsable by the creator module.
 * @memberof module:shared/content-creator
 * @param {Object} req the request object, POST-data whould be a string stored in req.body
 * @returns {Object} a content object, consumable by the templating / rendering engine
 */
module.exports = (req) => {

	let _string, _out, _errorPos;

	let _object = {
		"decorator" : { "color" : null},
		"placeholder": placeholder,
		"in" : empty,
		"out": empty,
		"exitCode": 1,
	};

	if (!req || !req.body || typeof(req.body) !== "string" || req.body.lenght <= paramName.length) {
		return _object;
	}

	// grab the data from the textarea, naive but .. hey :D
	_string = req.body.slice(paramName.length);

	// return the input
	_object.in = _string;

	try {
		// get the stringified object
		_out = "'" + JSON.stringify(JSON.parse(_string)) + "'";
		_object.out = _out;
		_object.exitCode = 0;
	} catch (error) {

		// construct the error message
		_object.exitCode = 1;
		_out = error.toString();
		_out += "<hr />"

		// get the error position for a detailed output
		_errorPos = Number(error.toString().slice(error.toString().lastIndexOf(" ") + 1));

		if (_errorPos !== 0) {
			_out += _string.slice(0, _errorPos - 1) + '<span class="jsny-error">' + _string.slice(_errorPos - 1, _errorPos) + '</span>' + _string.slice(_errorPos);
		} else {
			_out += _string;
		}

		_object.out = _out;
	}

	return _object;
}


/**
 * @module client/ui-event/handler
 * @description
 * Event handler for all ui events.
 * - Creates a request object from the DOM-Node
 * - Creates the content object from the request object
 * - Decorates the content object
 * - Renders / updates the view dynamically
 * - Copies the result to the clipboard if possible
 * @returns {Number} the exit code
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

const copy = require('clipboard-copy');

const randomdDecorator = require('./../../shared/decorator-random.js');
const contentCreator = require('./../../shared/creator-content.js');
const bridgeRequest = require('./../../client/bridge-request');
const render = require('./../../client/render');
const node = document.querySelector("textarea");

/**
 * @param {Event} event the DOM-Event
 * @memberof module:client/ui-event-handler
 * @returns {Number} the exit code
 */
module.exports = (event) => {
	let _exitCode, _content;
	event.preventDefault();
	_content = randomdDecorator(contentCreator(bridgeRequest(node)));

	// render decorated content from the node and returns the exitCode
	_exitCode = render( _content );

	// copy successfull transformations from from submits to the clipboard
	if ( _exitCode === 0 && event.type === "submit" ) {
		copy(_content.out);
	}

	return _exitCode;
};


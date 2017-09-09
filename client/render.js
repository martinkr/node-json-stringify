/**
 * @module client/render
 * @description
 * Renders / updates the view without reloading the page
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

/**
 * Renders / updates the view without reloading the page
 * @param {Object} data the decorated content object from the content creator module
 * @memberof module:client/ui-event-handler
 * @returns {Number} the exit code
 */
module.exports = (data) => {
	document.querySelector(".js--introduction").style.backgroundColor = data.decorator.color;
	document.querySelector(".js--output").innerHTML = data.out;
	return data.exitCode;
}


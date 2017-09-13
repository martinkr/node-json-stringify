/**
 * @module shared/decorator-random
 * @description
 * Creates a random color theme and decorates the content object.
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

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

/**
 * Returns the content object, decorated with a random color theme.
 * @memberof module:shared/decorator-random
 * @param {Object} content a content object, consumable by the templating / rendering engine
 * @returns {Object} the content object, decorated with a random color theme.
 */
module.exports = (content) => {
	// let _clone = { ...content };
	// _clone.decorator = { "color": colorMap[Math.floor(Math.random() * colorMap.length)] }
	// return _clone;

	content.decorator = { "color": colorMap[Math.floor(Math.random() * colorMap.length)] }
	return content;
};
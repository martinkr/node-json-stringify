/**
 * @module client/ui-event/submit
 * @description
 * Sets up the submit event on the form node.
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

const eventHandler = require('./../../client/ui-event/handler');
const eventElement = document.querySelector("form");

/**
 * Adds event listener for the submit event on the form node.
 * Calls the generic event handler.
 * @memberof module:client/ui-event/submit
 * @returns {undefined}
 */
module.exports = () => eventElement.addEventListener("submit", eventHandler);
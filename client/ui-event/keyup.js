/**
 * @module client/ui-event/keyup
 * @description
 * Sets up the keyup event on the texarea node.
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

const eventHandler = require('./../../client/ui-event/handler');
const eventElement = document.querySelector("textarea");


/**
 * Adds event listener for the keyup event on the texarea node.
 * Calls the generic event handler.
 * @memberof module:client/ui-event/keyup
 * @returns {undefined}
 */
module.exports = () => eventElement.addEventListener("keyup", eventHandler);
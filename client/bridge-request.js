/**
 * @module client/bridge-request
 * @description
 * A bridge between the DOM-Event and the content creator module.
 * Returns a request object, generated from the DOM-nodes
 * and parsable by the creator module.
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

/**
 * Returns a request object, generated from the DOM-nodes
 * and parsable by the creator module.
 * @memberof module:client/bridge-request
 * @param {DOM-node} node the node we're using for the request object construction
 * @returns {Object} a request object, generated from the DOM-node and parsable by the creator module.
 */
module.exports = (node) => { return { "body": `${node.getAttribute("name")}=${node.value}` } };
/**
 * @module client/main
 * @description
 * The client component!
 *
 * Setus up the client scripts.
 * Main entry point to the client.
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 *
 */

const uiSubmit = require('./../client/ui-event/submit');
const uiKeyup = require('./../client/ui-event/keyup');

uiSubmit();
uiKeyup();


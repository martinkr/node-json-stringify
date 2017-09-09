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
 * $ node ./main.js
 * $ forever ./main.js
 * $ yarn start
 *
 * Example: http://localhost:3000/
 *
 * Copyright (c) 2016 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause github@mkrause.info
 */


const app = require('./server/main');


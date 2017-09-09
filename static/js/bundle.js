(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

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
module.exports = function (node) {
  return { "body": node.getAttribute("name") + "=" + node.value };
};

},{}],2:[function(require,module,exports){
'use strict';

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

var uiSubmit = require('./../client/ui-event/submit');
var uiKeyup = require('./../client/ui-event/keyup');

uiSubmit();
uiKeyup();

},{"./../client/ui-event/keyup":5,"./../client/ui-event/submit":6}],3:[function(require,module,exports){
"use strict";

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
module.exports = function (data) {
  document.querySelector(".js--introduction").style.backgroundColor = data.decorator.color;
  document.querySelector(".js--output").innerHTML = data.out;
  return data.exitCode;
};

},{}],4:[function(require,module,exports){
'use strict';

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

var copy = require('clipboard-copy');

var randomdDecorator = require('./../../shared/decorator-random.js');
var contentCreator = require('./../../shared/creator-content.js');
var bridgeRequest = require('./../../client/bridge-request');
var render = require('./../../client/render');
var node = document.querySelector("textarea");

/**
 * @param {Event} event the DOM-Event
 * @memberof module:client/ui-event-handler
 * @returns {Number} the exit code
 */
module.exports = function (event) {
  var _exitCode = void 0,
      _content = void 0;
  event.preventDefault();
  _content = randomdDecorator(contentCreator(bridgeRequest(node)));

  // render decorated content from the node and returns the exitCode
  _exitCode = render(_content);

  // copy successfull transformations from from submits to the clipboard
  if (_exitCode === 0 && event.type === "submit") {
    copy(_content.out);
  }

  return _exitCode;
};

},{"./../../client/bridge-request":1,"./../../client/render":3,"./../../shared/creator-content.js":8,"./../../shared/decorator-random.js":9,"clipboard-copy":7}],5:[function(require,module,exports){
"use strict";

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

var eventHandler = require('./../../client/ui-event/handler');
var eventElement = document.querySelector("textarea");

/**
 * Adds event listener for the keyup event on the texarea node.
 * Calls the generic event handler.
 * @memberof module:client/ui-event/keyup
 * @returns {undefined}
 */
module.exports = function () {
  return eventElement.addEventListener("keyup", eventHandler);
};

},{"./../../client/ui-event/handler":4}],6:[function(require,module,exports){
"use strict";

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

var eventHandler = require('./../../client/ui-event/handler');
var eventElement = document.querySelector("form");

/**
 * Adds event listener for the submit event on the form node.
 * Calls the generic event handler.
 * @memberof module:client/ui-event/submit
 * @returns {undefined}
 */
module.exports = function () {
  return eventElement.addEventListener("submit", eventHandler);
};

},{"./../../client/ui-event/handler":4}],7:[function(require,module,exports){
module.exports = clipboardCopy

function clipboardCopy (text) {
  // A <span> contains the text to copy
  var span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre' // Preserve consecutive spaces and newlines

  // An <iframe> isolates the <span> from the page's styles
  var iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  var win = iframe.contentWindow
  win.document.body.appendChild(span)

  var selection = win.getSelection()

  // Firefox fails to get a selection from <iframe> window, so fallback
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  var range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  var success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {}

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

},{}],8:[function(require,module,exports){
'use strict';

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
var paramName = "input=";
var placeholder = '{"foo" : "bar" }';
var empty = '';

/**
 * Returns a request object, generated from the DOM-nodes
 * and parsable by the creator module.
 * @memberof module:shared/content-creator
 * @param {Object} req the request object, POST-data whould be a string stored in req.body
 * @returns {Object} a content object, consumable by the templating / rendering engine
 */
module.exports = function (req) {

	var _string = void 0,
	    _out = void 0,
	    _errorPos = void 0;

	var _object = {
		"decorator": { "color": null },
		"placeholder": placeholder,
		"in": empty,
		"out": empty,
		"exitCode": 1
	};

	if (!req || !req.body || typeof req.body !== "string" || req.body.lenght <= paramName.length) {
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
		_out += "<hr />";

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
};

},{}],9:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var colorMap = ["rgb(213, 0, 0)", "rgb(197, 17, 98)", "rgb(170, 0, 255)", "rgb(98, 0, 234)", "rgb(48, 79, 254)", "rgb(41, 98, 255)", "rgb(0, 145, 234)", "rgb(0, 200, 83)", "rgb(100, 221, 23)", "gb(255, 214, 0)", "gb(255, 171, 0)", "rgb(255, 109, 0)", "rgb(221, 44, 0)"];

/**
 * Returns the content object, decorated with a random color theme.
 * @memberof module:shared/decorator-random
 * @param {Object} content a content object, consumable by the templating / rendering engine
 * @returns {Object} the content object, decorated with a random color theme.
 */
module.exports = function (content) {
	var _clone = _extends({}, content);
	_clone.decorator = { "color": colorMap[Math.floor(Math.random() * colorMap.length)] };
	return _clone;
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYnJpZGdlLXJlcXVlc3QuanMiLCJjbGllbnQvbWFpbi5qcyIsImNsaWVudC9yZW5kZXIuanMiLCJjbGllbnQvdWktZXZlbnQvaGFuZGxlci5qcyIsImNsaWVudC91aS1ldmVudC9rZXl1cC5qcyIsImNsaWVudC91aS1ldmVudC9zdWJtaXQuanMiLCJub2RlX21vZHVsZXMvY2xpcGJvYXJkLWNvcHkvaW5kZXguanMiLCJzaGFyZWQvY3JlYXRvci1jb250ZW50LmpzIiwic2hhcmVkL2RlY29yYXRvci1yYW5kb20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7O0FBT0EsT0FBTyxPQUFQLEdBQWlCLFVBQUMsSUFBRCxFQUFVO0FBQUUsU0FBTyxFQUFFLFFBQVcsS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBQVgsU0FBd0MsS0FBSyxLQUEvQyxFQUFQO0FBQWlFLENBQTlGOzs7OztBQ3JCQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsSUFBTSxXQUFXLFFBQVEsNkJBQVIsQ0FBakI7QUFDQSxJQUFNLFVBQVUsUUFBUSw0QkFBUixDQUFoQjs7QUFFQTtBQUNBOzs7OztBQ25CQTs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7OztBQU1BLE9BQU8sT0FBUCxHQUFpQixVQUFDLElBQUQsRUFBVTtBQUMxQixXQUFTLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLEtBQTVDLENBQWtELGVBQWxELEdBQW9FLEtBQUssU0FBTCxDQUFlLEtBQW5GO0FBQ0EsV0FBUyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELEtBQUssR0FBdkQ7QUFDQSxTQUFPLEtBQUssUUFBWjtBQUNBLENBSkQ7Ozs7O0FDbEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBTSxPQUFPLFFBQVEsZ0JBQVIsQ0FBYjs7QUFFQSxJQUFNLG1CQUFtQixRQUFRLG9D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O0FBQ0EsY0FBWSxPQUFPLE1BQU0sUUFBTixHQUFpQixLQUFqQixDQUF1QixNQUFNLFFBQU4sR0FBaUIsV0FBakIsQ0FBNkIsR0FBN0IsSUFBb0MsQ0FBM0QsQ0FBUCxDQUFaOztBQUVBLE1BQUksY0FBYyxDQUFsQixFQUFxQjtBQUNwQixXQUFRLFFBQVEsS0FBUixDQUFjLENBQWQsRUFBaUIsWUFBWSxDQUE3QixJQUFrQywyQkFBbEMsR0FBZ0UsUUFBUSxLQUFSLENBQWMsWUFBWSxDQUExQixFQUE2QixTQUE3QixDQUFoRSxHQUEwRyxTQUExRyxHQUFzSCxRQUFRLEtBQVIsQ0FBYyxTQUFkLENBQTlIO0FBQ0EsR0FGRCxNQUVPO0FBQ04sV0FBUSxPQUFSO0FBQ0E7O0FBRUQsVUFBUSxHQUFSLEdBQWMsSUFBZDtBQUNBOztBQUVELFFBQU8sT0FBUDtBQUNBLENBL0NEOzs7Ozs7O0FDdkJBOzs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLFdBQVcsQ0FDaEIsZ0JBRGdCLEVBRWhCLGtCQUZnQixFQUdoQixrQkFIZ0IsRUFJaEIsaUJBSmdCLEVBS2hCLGtCQUxnQixFQU1oQixrQkFOZ0IsRUFPaEIsa0JBUGdCLEVBUWhCLGlCQVJnQixFQVNoQixtQkFUZ0IsRUFVaEIsaUJBVmdCLEVBV2hCLGlCQVhnQixFQVloQixrQkFaZ0IsRUFhaEIsaUJBYmdCLENBQWpCOztBQWdCQTs7Ozs7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLFVBQUMsT0FBRCxFQUFhO0FBQzdCLEtBQUksc0JBQWMsT0FBZCxDQUFKO0FBQ0EsUUFBTyxTQUFQLEdBQW1CLEVBQUUsU0FBUyxTQUFTLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixTQUFTLE1BQXBDLENBQVQsQ0FBWCxFQUFuQjtBQUNBLFFBQU8sTUFBUDtBQUNBLENBSkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAbW9kdWxlIGNsaWVudC9icmlkZ2UtcmVxdWVzdFxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGJyaWRnZSBiZXR3ZWVuIHRoZSBET00tRXZlbnQgYW5kIHRoZSBjb250ZW50IGNyZWF0b3IgbW9kdWxlLlxuICogUmV0dXJucyBhIHJlcXVlc3Qgb2JqZWN0LCBnZW5lcmF0ZWQgZnJvbSB0aGUgRE9NLW5vZGVzXG4gKiBhbmQgcGFyc2FibGUgYnkgdGhlIGNyZWF0b3IgbW9kdWxlLlxuICpcbiAqIEBjb3B5cmlnaHQgMjAxNiwgMjAxNyBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPiAoaHR0cDovL21hcnRpbmtyLmdpdGh1Yi5pbylcbiAqIEBsaWNlbnNlIE1JVCBsaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEBhdXRob3IgTWFydGluIEtyYXVzZSA8Z2l0aHViQG1rcmF1c2UuaW5mbz5cbiAqXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVxdWVzdCBvYmplY3QsIGdlbmVyYXRlZCBmcm9tIHRoZSBET00tbm9kZXNcbiAqIGFuZCBwYXJzYWJsZSBieSB0aGUgY3JlYXRvciBtb2R1bGUuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC9icmlkZ2UtcmVxdWVzdFxuICogQHBhcmFtIHtET00tbm9kZX0gbm9kZSB0aGUgbm9kZSB3ZSdyZSB1c2luZyBmb3IgdGhlIHJlcXVlc3Qgb2JqZWN0IGNvbnN0cnVjdGlvblxuICogQHJldHVybnMge09iamVjdH0gYSByZXF1ZXN0IG9iamVjdCwgZ2VuZXJhdGVkIGZyb20gdGhlIERPTS1ub2RlIGFuZCBwYXJzYWJsZSBieSB0aGUgY3JlYXRvciBtb2R1bGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKG5vZGUpID0+IHsgcmV0dXJuIHsgXCJib2R5XCI6IGAke25vZGUuZ2V0QXR0cmlidXRlKFwibmFtZVwiKX09JHtub2RlLnZhbHVlfWAgfSB9OyIsIi8qKlxuICogQG1vZHVsZSBjbGllbnQvbWFpblxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgY2xpZW50IGNvbXBvbmVudCFcbiAqXG4gKiBTZXR1cyB1cCB0aGUgY2xpZW50IHNjcmlwdHMuXG4gKiBNYWluIGVudHJ5IHBvaW50IHRvIHRoZSBjbGllbnQuXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuXG5jb25zdCB1aVN1Ym1pdCA9IHJlcXVpcmUoJy4vLi4vY2xpZW50L3VpLWV2ZW50L3N1Ym1pdCcpO1xuY29uc3QgdWlLZXl1cCA9IHJlcXVpcmUoJy4vLi4vY2xpZW50L3VpLWV2ZW50L2tleXVwJyk7XG5cbnVpU3VibWl0KCk7XG51aUtleXVwKCk7XG5cbiIsIi8qKlxuICogQG1vZHVsZSBjbGllbnQvcmVuZGVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJlbmRlcnMgLyB1cGRhdGVzIHRoZSB2aWV3IHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBwYWdlXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgLyB1cGRhdGVzIHRoZSB2aWV3IHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBwYWdlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSB0aGUgZGVjb3JhdGVkIGNvbnRlbnQgb2JqZWN0IGZyb20gdGhlIGNvbnRlbnQgY3JlYXRvciBtb2R1bGVcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50L3VpLWV2ZW50LWhhbmRsZXJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBleGl0IGNvZGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLS1pbnRyb2R1Y3Rpb25cIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZGF0YS5kZWNvcmF0b3IuY29sb3I7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtLW91dHB1dFwiKS5pbm5lckhUTUwgPSBkYXRhLm91dDtcblx0cmV0dXJuIGRhdGEuZXhpdENvZGU7XG59XG5cbiIsIi8qKlxuICogQG1vZHVsZSBjbGllbnQvdWktZXZlbnQvaGFuZGxlclxuICogQGRlc2NyaXB0aW9uXG4gKiBFdmVudCBoYW5kbGVyIGZvciBhbGwgdWkgZXZlbnRzLlxuICogLSBDcmVhdGVzIGEgcmVxdWVzdCBvYmplY3QgZnJvbSB0aGUgRE9NLU5vZGVcbiAqIC0gQ3JlYXRlcyB0aGUgY29udGVudCBvYmplY3QgZnJvbSB0aGUgcmVxdWVzdCBvYmplY3RcbiAqIC0gRGVjb3JhdGVzIHRoZSBjb250ZW50IG9iamVjdFxuICogLSBSZW5kZXJzIC8gdXBkYXRlcyB0aGUgdmlldyBkeW5hbWljYWxseVxuICogLSBDb3BpZXMgdGhlIHJlc3VsdCB0byB0aGUgY2xpcGJvYXJkIGlmIHBvc3NpYmxlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgZXhpdCBjb2RlXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuXG5jb25zdCBjb3B5ID0gcmVxdWlyZSgnY2xpcGJvYXJkLWNvcHknKTtcblxuY29uc3QgcmFuZG9tZERlY29yYXRvciA9IHJlcXVpcmUoJy4vLi4vLi4vc2hhcmVkL2RlY29yYXRvci1yYW5kb20uanMnKTtcbmNvbnN0IGNvbnRlbnRDcmVhdG9yID0gcmVxdWlyZSgnLi8uLi8uLi9zaGFyZWQvY3JlYXRvci1jb250ZW50LmpzJyk7XG5jb25zdCBicmlkZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi8uLi8uLi9jbGllbnQvYnJpZGdlLXJlcXVlc3QnKTtcbmNvbnN0IHJlbmRlciA9IHJlcXVpcmUoJy4vLi4vLi4vY2xpZW50L3JlbmRlcicpO1xuY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKTtcblxuLyoqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCB0aGUgRE9NLUV2ZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC91aS1ldmVudC1oYW5kbGVyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgZXhpdCBjb2RlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50KSA9PiB7XG5cdGxldCBfZXhpdENvZGUsIF9jb250ZW50O1xuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRfY29udGVudCA9IHJhbmRvbWREZWNvcmF0b3IoY29udGVudENyZWF0b3IoYnJpZGdlUmVxdWVzdChub2RlKSkpO1xuXG5cdC8vIHJlbmRlciBkZWNvcmF0ZWQgY29udGVudCBmcm9tIHRoZSBub2RlIGFuZCByZXR1cm5zIHRoZSBleGl0Q29kZVxuXHRfZXhpdENvZGUgPSByZW5kZXIoIF9jb250ZW50ICk7XG5cblx0Ly8gY29weSBzdWNjZXNzZnVsbCB0cmFuc2Zvcm1hdGlvbnMgZnJvbSBmcm9tIHN1Ym1pdHMgdG8gdGhlIGNsaXBib2FyZFxuXHRpZiAoIF9leGl0Q29kZSA9PT0gMCAmJiBldmVudC50eXBlID09PSBcInN1Ym1pdFwiICkge1xuXHRcdGNvcHkoX2NvbnRlbnQub3V0KTtcblx0fVxuXG5cdHJldHVybiBfZXhpdENvZGU7XG59O1xuXG4iLCIvKipcbiAqIEBtb2R1bGUgY2xpZW50L3VpLWV2ZW50L2tleXVwXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldHMgdXAgdGhlIGtleXVwIGV2ZW50IG9uIHRoZSB0ZXhhcmVhIG5vZGUuXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuXG5jb25zdCBldmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NsaWVudC91aS1ldmVudC9oYW5kbGVyJyk7XG5jb25zdCBldmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIik7XG5cblxuLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUga2V5dXAgZXZlbnQgb24gdGhlIHRleGFyZWEgbm9kZS5cbiAqIENhbGxzIHRoZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC91aS1ldmVudC9rZXl1cFxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiBldmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGV2ZW50SGFuZGxlcik7IiwiLyoqXG4gKiBAbW9kdWxlIGNsaWVudC91aS1ldmVudC9zdWJtaXRcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0cyB1cCB0aGUgc3VibWl0IGV2ZW50IG9uIHRoZSBmb3JtIG5vZGUuXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuXG5jb25zdCBldmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NsaWVudC91aS1ldmVudC9oYW5kbGVyJyk7XG5jb25zdCBldmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcblxuLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3VibWl0IGV2ZW50IG9uIHRoZSBmb3JtIG5vZGUuXG4gKiBDYWxscyB0aGUgZ2VuZXJpYyBldmVudCBoYW5kbGVyLlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQvdWktZXZlbnQvc3VibWl0XG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IGV2ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGV2ZW50SGFuZGxlcik7IiwibW9kdWxlLmV4cG9ydHMgPSBjbGlwYm9hcmRDb3B5XG5cbmZ1bmN0aW9uIGNsaXBib2FyZENvcHkgKHRleHQpIHtcbiAgLy8gQSA8c3Bhbj4gY29udGFpbnMgdGhlIHRleHQgdG8gY29weVxuICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICBzcGFuLnRleHRDb250ZW50ID0gdGV4dFxuICBzcGFuLnN0eWxlLndoaXRlU3BhY2UgPSAncHJlJyAvLyBQcmVzZXJ2ZSBjb25zZWN1dGl2ZSBzcGFjZXMgYW5kIG5ld2xpbmVzXG5cbiAgLy8gQW4gPGlmcmFtZT4gaXNvbGF0ZXMgdGhlIDxzcGFuPiBmcm9tIHRoZSBwYWdlJ3Mgc3R5bGVzXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxuICBpZnJhbWUuc2FuZGJveCA9ICdhbGxvdy1zYW1lLW9yaWdpbidcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpXG5cbiAgdmFyIHdpbiA9IGlmcmFtZS5jb250ZW50V2luZG93XG4gIHdpbi5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNwYW4pXG5cbiAgdmFyIHNlbGVjdGlvbiA9IHdpbi5nZXRTZWxlY3Rpb24oKVxuXG4gIC8vIEZpcmVmb3ggZmFpbHMgdG8gZ2V0IGEgc2VsZWN0aW9uIGZyb20gPGlmcmFtZT4gd2luZG93LCBzbyBmYWxsYmFja1xuICBpZiAoIXNlbGVjdGlvbikge1xuICAgIHdpbiA9IHdpbmRvd1xuICAgIHNlbGVjdGlvbiA9IHdpbi5nZXRTZWxlY3Rpb24oKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3BhbilcbiAgfVxuXG4gIHZhciByYW5nZSA9IHdpbi5kb2N1bWVudC5jcmVhdGVSYW5nZSgpXG4gIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKVxuICByYW5nZS5zZWxlY3ROb2RlKHNwYW4pXG4gIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSlcblxuICB2YXIgc3VjY2VzcyA9IGZhbHNlXG4gIHRyeSB7XG4gICAgc3VjY2VzcyA9IHdpbi5kb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG4gIH0gY2F0Y2ggKGVycikge31cblxuICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKClcbiAgc3Bhbi5yZW1vdmUoKVxuICBpZnJhbWUucmVtb3ZlKClcblxuICByZXR1cm4gc3VjY2Vzc1xufVxuIiwiLyoqXG4gKiBAbW9kdWxlIHNoYXJlZC9jb250ZW50LWNyZWF0b3JcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyB0aGUgY29udGVudCBvYmplY3QgZnJvbSB0aGUgcmVxdWVzdCBvYmplY3QuXG4gKiBUaGUgY29udGVudCBvYmplY3QgY29udGFpbnMgYWxsIHRoZSBpbmZvcm1hdGlvbiBmb3IgdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuY29uc3QgcGFyYW1OYW1lID0gXCJpbnB1dD1cIjtcbmNvbnN0IHBsYWNlaG9sZGVyID0gJ3tcImZvb1wiIDogXCJiYXJcIiB9JztcbmNvbnN0IGVtcHR5ID0gJyc7XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcXVlc3Qgb2JqZWN0LCBnZW5lcmF0ZWQgZnJvbSB0aGUgRE9NLW5vZGVzXG4gKiBhbmQgcGFyc2FibGUgYnkgdGhlIGNyZWF0b3IgbW9kdWxlLlxuICogQG1lbWJlcm9mIG1vZHVsZTpzaGFyZWQvY29udGVudC1jcmVhdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxIHRoZSByZXF1ZXN0IG9iamVjdCwgUE9TVC1kYXRhIHdob3VsZCBiZSBhIHN0cmluZyBzdG9yZWQgaW4gcmVxLmJvZHlcbiAqIEByZXR1cm5zIHtPYmplY3R9IGEgY29udGVudCBvYmplY3QsIGNvbnN1bWFibGUgYnkgdGhlIHRlbXBsYXRpbmcgLyByZW5kZXJpbmcgZW5naW5lXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKHJlcSkgPT4ge1xuXG5cdGxldCBfc3RyaW5nLCBfb3V0LCBfZXJyb3JQb3M7XG5cblx0bGV0IF9vYmplY3QgPSB7XG5cdFx0XCJkZWNvcmF0b3JcIiA6IHsgXCJjb2xvclwiIDogbnVsbH0sXG5cdFx0XCJwbGFjZWhvbGRlclwiOiBwbGFjZWhvbGRlcixcblx0XHRcImluXCIgOiBlbXB0eSxcblx0XHRcIm91dFwiOiBlbXB0eSxcblx0XHRcImV4aXRDb2RlXCI6IDEsXG5cdH07XG5cblx0aWYgKCFyZXEgfHwgIXJlcS5ib2R5IHx8IHR5cGVvZihyZXEuYm9keSkgIT09IFwic3RyaW5nXCIgfHwgcmVxLmJvZHkubGVuZ2h0IDw9IHBhcmFtTmFtZS5sZW5ndGgpIHtcblx0XHRyZXR1cm4gX29iamVjdDtcblx0fVxuXG5cdC8vIGdyYWIgdGhlIGRhdGEgZnJvbSB0aGUgdGV4dGFyZWEsIG5haXZlIGJ1dCAuLiBoZXkgOkRcblx0X3N0cmluZyA9IHJlcS5ib2R5LnNsaWNlKHBhcmFtTmFtZS5sZW5ndGgpO1xuXG5cdC8vIHJldHVybiB0aGUgaW5wdXRcblx0X29iamVjdC5pbiA9IF9zdHJpbmc7XG5cblx0dHJ5IHtcblx0XHQvLyBnZXQgdGhlIHN0cmluZ2lmaWVkIG9iamVjdFxuXHRcdF9vdXQgPSBcIidcIiArIEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2UoX3N0cmluZykpICsgXCInXCI7XG5cdFx0X29iamVjdC5vdXQgPSBfb3V0O1xuXHRcdF9vYmplY3QuZXhpdENvZGUgPSAwO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXG5cdFx0Ly8gY29uc3RydWN0IHRoZSBlcnJvciBtZXNzYWdlXG5cdFx0X29iamVjdC5leGl0Q29kZSA9IDE7XG5cdFx0X291dCA9IGVycm9yLnRvU3RyaW5nKCk7XG5cdFx0X291dCArPSBcIjxociAvPlwiXG5cblx0XHQvLyBnZXQgdGhlIGVycm9yIHBvc2l0aW9uIGZvciBhIGRldGFpbGVkIG91dHB1dFxuXHRcdF9lcnJvclBvcyA9IE51bWJlcihlcnJvci50b1N0cmluZygpLnNsaWNlKGVycm9yLnRvU3RyaW5nKCkubGFzdEluZGV4T2YoXCIgXCIpICsgMSkpO1xuXG5cdFx0aWYgKF9lcnJvclBvcyAhPT0gMCkge1xuXHRcdFx0X291dCArPSBfc3RyaW5nLnNsaWNlKDAsIF9lcnJvclBvcyAtIDEpICsgJzxzcGFuIGNsYXNzPVwianNueS1lcnJvclwiPicgKyBfc3RyaW5nLnNsaWNlKF9lcnJvclBvcyAtIDEsIF9lcnJvclBvcykgKyAnPC9zcGFuPicgKyBfc3RyaW5nLnNsaWNlKF9lcnJvclBvcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9vdXQgKz0gX3N0cmluZztcblx0XHR9XG5cblx0XHRfb2JqZWN0Lm91dCA9IF9vdXQ7XG5cdH1cblxuXHRyZXR1cm4gX29iamVjdDtcbn1cblxuIiwiLyoqXG4gKiBAbW9kdWxlIHNoYXJlZC9kZWNvcmF0b3ItcmFuZG9tXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYSByYW5kb20gY29sb3IgdGhlbWUgYW5kIGRlY29yYXRlcyB0aGUgY29udGVudCBvYmplY3QuXG4gKlxuICogQGNvcHlyaWdodCAyMDE2LCAyMDE3IE1hcnRpbiBLcmF1c2UgPGdpdGh1YkBta3JhdXNlLmluZm8+IChodHRwOi8vbWFydGlua3IuZ2l0aHViLmlvKVxuICogQGxpY2Vuc2UgTUlUIGxpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQGF1dGhvciBNYXJ0aW4gS3JhdXNlIDxnaXRodWJAbWtyYXVzZS5pbmZvPlxuICpcbiAqL1xuXG5jb25zdCBjb2xvck1hcCA9IFtcblx0XCJyZ2IoMjEzLCAwLCAwKVwiLFxuXHRcInJnYigxOTcsIDE3LCA5OClcIixcblx0XCJyZ2IoMTcwLCAwLCAyNTUpXCIsXG5cdFwicmdiKDk4LCAwLCAyMzQpXCIsXG5cdFwicmdiKDQ4LCA3OSwgMjU0KVwiLFxuXHRcInJnYig0MSwgOTgsIDI1NSlcIixcblx0XCJyZ2IoMCwgMTQ1LCAyMzQpXCIsXG5cdFwicmdiKDAsIDIwMCwgODMpXCIsXG5cdFwicmdiKDEwMCwgMjIxLCAyMylcIixcblx0XCJnYigyNTUsIDIxNCwgMClcIixcblx0XCJnYigyNTUsIDE3MSwgMClcIixcblx0XCJyZ2IoMjU1LCAxMDksIDApXCIsXG5cdFwicmdiKDIyMSwgNDQsIDApXCJcbl1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb250ZW50IG9iamVjdCwgZGVjb3JhdGVkIHdpdGggYSByYW5kb20gY29sb3IgdGhlbWUuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOnNoYXJlZC9kZWNvcmF0b3ItcmFuZG9tXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGVudCBhIGNvbnRlbnQgb2JqZWN0LCBjb25zdW1hYmxlIGJ5IHRoZSB0ZW1wbGF0aW5nIC8gcmVuZGVyaW5nIGVuZ2luZVxuICogQHJldHVybnMge09iamVjdH0gdGhlIGNvbnRlbnQgb2JqZWN0LCBkZWNvcmF0ZWQgd2l0aCBhIHJhbmRvbSBjb2xvciB0aGVtZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoY29udGVudCkgPT4ge1xuXHRsZXQgX2Nsb25lID0geyAuLi5jb250ZW50IH07XG5cdF9jbG9uZS5kZWNvcmF0b3IgPSB7IFwiY29sb3JcIjogY29sb3JNYXBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JNYXAubGVuZ3RoKV0gfVxuXHRyZXR1cm4gX2Nsb25lO1xufTsiXX0=

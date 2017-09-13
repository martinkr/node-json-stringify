/**
 * specs for the server component of json stringify
*
 *
 * @copyright 2016, 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 */


const app = require("./../server/main.js")
const supertest = require("supertest")(app);

describe('the json-stringify service', () => {

	describe('shows the page on first load', () => {

		it("should respond with 200", (done) => {
			supertest
				.get("/")
				.expect(200)
				.end(done);
		});

		it("should render the template", (done) => {
			supertest
				.get("/")
				.expect(/JSON Stringify/)
				.end(done);
		});

	});

	describe('handles valid input', () => {

		it("should accept a string \"string\" and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=\"string\"")
				.expect(200)
				.expect(/'"string"'/)
				.end(done);
		});

		it("should accept a number 1 and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=1")
				.expect(200)
				.expect(/'1'/)
				.end(done);
		});


		it("should accept an array [ 1 ] and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=[1]")
				.expect(200)
				.expect(/'\[1\]'/)
				.end(done);
		});



		it("should accept an object { \"foo\": \"bar\" } and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input={\"foo\":\"bar\"}")
				.expect(200)
				.expect(/'{"foo":"bar"}'/)
				.end(done);
		});

		it("should accept a boolean true and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=true")
				.expect(200)
				.expect(/'true'/)
				.end(done);
		});

		it("should accept a boolean false and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=false")
				.expect(200)
				.expect(/'false'/)
				.end(done);
		});

		it("should accept null and respond with 200 and the strinfigied content", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=null")
				.expect(200)
				.expect(/'null'/)
				.end(done);
		});

	});



	describe('handles invalid input', () => {

		it("should not accept string and respond with 200 and an error message", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=string")
				.expect(200)
				.expect(/SyntaxError: Unexpected token s in JSON at position 0/)
				.end(done);
		});

		it("should not accept undefiend and respond with 200 and an error message", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input=undefined")
				.expect(200)
				.expect(/SyntaxError: Unexpected token u in JSON at position 0/)
				.end(done);
		});

		it("should not accept an invalid {'foo':'bar'} and respond with 200 and an error message", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input={'foo':'bar'}")
				.expect(200)
				// .expect(/SyntaxError: Unexpected token ' in JSON at position 1/)
				.end(done);
		});

		it("should not accept an invalid {\"foo\":\"bar} and respond with 200 and an error message", (done) => {
			supertest
				.post('/')
				.set('Content-Type', 'text/plain')
				.send("input={\"foo\":\"bar}")
				.expect(200)
				// .expect(/SyntaxError: Unexpected token ' in JSON at position 1/)
				.end(done);
		});

	});


	describe('is performant', () => {

		it("should use GZIP for all requests", (done) => {
			supertest
				.get("/")
				.set("Accept-Encoding", "gzip, deflate, br")
				.expect("content-encoding", "gzip")
				.end(done);
		});

	});

});
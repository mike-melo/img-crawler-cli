var assert = require('assert'),
	gently = global.GENTLY = new (require('gently')),
	fixture = require('./../lib/cli');

suite('cli', function() {
	test('no args', function(done) {
		
		gently.expect(gently.hijacked.commander, 'help', function() {
			  
		});
		
		var argv = [null, 'cli-test'];
		
		fixture(argv);
		done();
	});
	
	
	test('bad url', function(done) {
		var consoleObject = new Object();
		
		gently.expect(consoleObject, 'error', function(message) {
			  assert.equal(message, 'Invalid URL');
		});
		
		var argv = [null, 'cli-test', '-u', 'ht://www.google.ca'];
		
		fixture(argv, consoleObject);
		done();
	});
	
	test('good url', function(done) {
		
//		gently.expect(gently.hijacked.img-crawler, 'crawl', function(url) {
//			assert.equal(url, 'http://www.google.ca');  
//		});
		
		var argv = [null, 'cli-test', '-u', 'http://www.google.ca'];
		
		fixture(argv);
		done();
	});
});

	

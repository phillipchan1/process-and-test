var should = require('chai').should();
var processAndTest = require('../src/process-and-test.js');

// ensure it instantiates correctly
describe('instantiation', function() {
	console.log(processAndTest)
	var sampleProcess = new processAndTest();

	it('should instantiate correctly', function() {
		sampleProcess.should.be.a('object');
	});

});
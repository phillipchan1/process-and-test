var should = require('chai').should();
var processAndTest = require('../src/process-and-test.js');

var sampleProcess = new processAndTest();

// ensure it instantiates correctly
describe('instantiation', function() {

	it('should instantiate correctly', function() {
		sampleProcess.should.be.a('object');
	});
});

// creating new process works
describe('new task', function() {

	it('should add a new task successfully', function() {
		sampleProcess.newProcess({});
		sampleProcess.processSets.should.have.length.above(0);
	});

});




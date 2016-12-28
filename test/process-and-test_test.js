var should = require('chai').should();
var processAndTest = require('../src/process-and-test.js');

var sampleProcess = new processAndTest('this is a string');

// ensure it instantiates correctly
describe('instantiation', function() {

	it('should instantiate correctly', function() {
		sampleProcess.should.be.a('object');
	});
});

// create a sample process
sampleProcess.newProcess({});

// creating new process works
describe('new task', function() {
	it('should add a new task successfully', function() {
		// console.log(sampleProcess.processSets)
		sampleProcess.processSets.should.have.length.above(0);
	});
});

sampleProcess.newProcess({
	action: function(data) {
		console.log(data);
	}
});

sampleProcess.run();

// if test fails,



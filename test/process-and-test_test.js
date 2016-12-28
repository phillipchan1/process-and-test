var should = require('chai').should();
var processAndTest = require('../src/process-and-test.js');

var sampleProcess = new processAndTest('this is a string data im sending');

// ensure it instantiates correctly
describe('instantiation', function() {

	it('should instantiate correctly', function() {
		sampleProcess.should.be.a('object');
	});
});

// create a sample process with nothing defined
sampleProcess.newProcess({

});

// ensure creating new process works
describe('creating a process with newProcess()', function() {
	it('should add a new task successfully with the right keys', function() {
		sampleProcess.processSets.should.be.a['array'];
		sampleProcess.processSets[0].should.contain.keys('tests', 'action', 'mode', 'errorMessage');
		sampleProcess.processSets.should.have.length.above(0);
	});

	it('should contain an action that is a function', function() {
		sampleProcess.processSets[0].action.should.be.a('function');
	});

	it('should contain an array of tests', function() {
		sampleProcess.processSets[0].tests.should.be.a('array');
	});

	it('should have a mode defined', function() {
		sampleProcess.processSets[0].mode.should.be.a('string');
	});
});

// ensure a process with no test should return true
describe('running the processes with no tests', function() {
	sampleProcess.run();
	sampleProcess.pass.should.be.true;
});

// create a sample process with some action
sampleProcess.newProcess({
	action: function(data) {
		return data.toUpperCase();
	}
});


sampleProcess.onEnd = function() {
	console.log(sampleProcess.data);
};



// if test fails,



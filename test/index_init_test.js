var should = require('chai').should();
var processAndTest = require('../src/index.js');

var sampleProcess = new processAndTest('this is a string data im sending');

describe('new processAndTest() instantiates', function() {

	it('should return an object', function() {
		sampleProcess.should.be.a('object');
	});
});

describe('newProcess({}): create an empty process', function() {

	before('init and add a new empty process', function() {
		sampleProcess.newProcess({});
	})

	it(`the process should have keys 'tests', 'action', and 'mode'`, function() {
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

describe('newProcess(): adding action and tests to a process', function() {
	before('add a new process with an action as anonymous function', function() {
		sampleProcess.newProcess({
			action: function(data) {
				return data.toUpperCase();
			}
		})
	});

	before('add a new process with action as named function', function() {
		var toUpperCase = function(string) {
			return string.toUpperCase();
		}

		sampleProcess.newProcess({
			action: toUpperCase
		})
	});

	it('should have a function as an action when using anonymous function', function() {
		sampleProcess.processSets[1].action.should.be.a('function');
	})

	it('should have a function as an action when using named function', function() {
		sampleProcess.processSets[2].action.should.be.a('function');
	})
});
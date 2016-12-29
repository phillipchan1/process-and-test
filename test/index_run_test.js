var should = require('chai').should;
var processAndTest = require('../src/index.js');


var sampleProcess = new processAndTest('this is a string data im sending');


describe(`run(): looping through syncronous processes`, function() {

});

describe(`run(): looping through asyncronous processes`, function() {

	before('init a new process, add some processes to it', function() {
		var sampleProcess = new processAndTest('this is a string data im sending');

	})

});

describe(`run(): looping through both sync and async processes`, function() {

	before('init a new process, add some processes to it', function() {
		var sampleProcess = new processAndTest('this is a string data im sending');
	})

});
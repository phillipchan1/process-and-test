var processAndTest = function(initialData) {
	var self = this;
	this.processSets = [];
	this.data = undefined;
	this.errorMessage = undefined;
	this.generateResult = function(pass, data) {
		return {
			pass: pass,
			data: data
		}
	};
	this.newProcess = function(options) {
		self.processSets.push({
			action: options.action,
			tests: options.tests,
			errorMessage: options.errorMessage
		})
	};
	this.run = function() {
		self.data = initialData;

		loopProcesses:
			for (var p = 0; p < self.processSets.length; p++) {
				var currentSet = self.processSets[p];
			
				self.data = currentSet.action();
				if (self.runTests(currentSet) === false) {
					resultOfRun = self.generateResult(false, self.errorMessage);
					break loopProcesses;
				}
				else {
					resultOfRun = self.generateResult(true, self.data);
				}
			}
		
		return resultOfRun;
	};
	this.runTests = function(set) {
		loopTests:
			for (var i = 0; i < set.tests.length ; i++) {
				var pass = set.tests[i](self.data);

				if (pass === false) {
					self.errorMessage = set.errorMessage;
					return false;
				}
			}
	};
};
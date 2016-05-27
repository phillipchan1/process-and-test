var processAndTest = function() {
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
			mode: options.mode,
			errorMessage: options.errorMessage
		})
	};
	this.run = function() {
		var counter = 0;
		var length = self.processSets.length;

		loopProcesses:
			for (var p = 0; p < self.processSets.length; p++) {
				var currentSet = self.processSets[p];
				
				// regular syncronous operations
				if (currentSet.mode !== "async") {
					self.data = currentSet.action();
					if (self.runTests(currentSet) === false) {
						resultOfRun = self.generateResult(false, self.errorMessage);
						break loopProcesses;
					}
					else {
						resultOfRun = self.generateResult(true, self.data);
					}
				} 
				// for async operations that leverage promises
				else if (currentSet.mode == "async") {
					currentSet.action(self.data)
						.then(function(result) {
							self.data = result;
							self.runTests(currentSet);
						})
				}
			}
		
		return resultOfRun;
	}
};
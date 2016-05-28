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
			mode: options.mode,
			errorMessage: options.errorMessage
		})
	};
	this.run = function(initialData) {
		var counter = 0;
		var numOfProcess = self.processSets.length;
		var currentSet = self.processSets[counter];
		self.data = initialData;

		(function runNextAction() {
			// if async
			if (currentSet.mode == "async") {
				currentSet.action(self.data)
					.then(function(res) {
						self.data = res;
						runNextAction();
					})
			} 
			// if sync
			else {
				self.data = currentSet.action();
				runNextAction();
			}

			// should we run the next one?
			if (counter < numOfProcess) {
				counter++
				processSets[counter].action();
			}
		})();

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
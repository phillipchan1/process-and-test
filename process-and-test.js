var processAndTest = function(initialData) {
			var self = this;
			this.processSets = [];
			this.data = initialData;
			this.errorMessage = undefined;
			this.pass = false;
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
				var numOfProcess = self.processSets.length;
				var currentSet = self.processSets[counter];

				// supports async operations
				var runNextAction = function(set) {
					// if async
					if (currentSet.mode == "async") {
						currentSet.action(self.data)
							.then(function(res) {
								self.data = res;
								runTests(currentSet);
							})
					} 
					// if sync
					else {
						self.data = currentSet.action(self.data);
						runTests(currentSet);
					}
				};

				// only sync operations
				var runTests = function(data) {

					// if it fails test
					if (self.runTests(data) === false) {
						self.pass = false;
						self.onEnd();
					}
					// if current set passes test
					else {
						runItAgain();
					}
				}

				// our loop/counter
				var runItAgain = function() {
					// should we run the next one?
					if ((counter + 1) < numOfProcess) {
						counter++
						currentSet = self.processSets[counter];
						runNextAction(currentSet);
					}

					else {
						self.pass = true;
						self.onEnd()
					}
				}

				// run it for the first time.
				runNextAction(currentSet);
			};
			this.onEnd = function() {},
			this.runTests = function(set) {
				for (var i = 0; i < set.tests.length ; i++) {
					var testResult = set.tests[i][0](self.data);

					if (testResult !== true) {
						self.errorMessage = testResult;
						return false;
					}
				}
			};
		}
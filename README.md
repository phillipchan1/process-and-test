# process-and-test.js
A JS function that allows for a streamlined process that allows for multiple tests to be passed along its process.

![alt tag](https://github.com/phillipchan2/process-and-test/blob/master/process-and-test.png?raw=true)

Often, we need to simulataneously process and a file and test it along the way to ensure the integrity of the file. This module should help that.

If it's good, it will return the final process of the file.
If not, it should return the error message set for that step.

### Usage
1) Init our object and pass in your data that you're processing:

```
var someProcess = new processAndTest(data);
```

2) Add in each step along with the tests we want to attach to that step. See the options in the constructor:

```
someProcess.newProcess({
    action: function() {
        // whatever we want to do with our data-as long as we return it.
        return data;
    },
    // 'async' or 'sync'
    mode: 'sync',
    // tests that we're passing in
    tests: [
        test1,
        test2
    ],
    errorMessage: "The error message given if this fails the test."
});
```

Example test to pass in:
```
// tests must return true or false
var checkCSVFormatting = function(csv) {
    return true;
}
```

3) Specify what happens with data after it is done testing and processing:
```
processer.onEnd = function() {
    // the pass property will return either true or false
    console.log(processer.pass);
    // the data will either give you the processed file or the error message
    console.log(processer.data);
}
```

3) Run the test with the `run()` method.

```
someProcess.run();
```

And you're set.

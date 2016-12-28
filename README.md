# process-and-test.js
A JS function that allows for a streamlined process that allows for multiple tests to be passed along its process.

## Table of Contents
1. [General](#general)
2. [Usage](#usage)
    - [Getting Started](#getting-started)
    - [Writing Your Tests](#writing-your-tests)
    - [Async Processes](#async-processes)
3. [Developing](#developing)

## General
![alt tag](assets/process-and-test.png?raw=true)

Often, we need to simultaneously process and a file and test it along the way to ensure the integrity of the file. This module should help that.

If it's good, it will return the final process of the file.
If not, it should return the error message set for that step.

## Usage

#### Getting Started
1) Init our object and pass in your data that you're processing:

```
var someProcess = new processAndTest(data);
```

2) Add in each step along with the tests we want to attach to that step. See the options in the constructor:

```
someProcess.newProcess({
    // whatever we want to do with our data-as long as we return it.
        return data;
    action: function() {
        
    },

    // Whether the process is 'async' or 'sync'
    mode: 'sync',

    // tests that we're passing in
    tests: [
        test1,
        test2
    ],

    // specify an error message to go with these sets of tests
    errorMessage: "The error message given if this fails the test."
});
```

3) Specify what happens with data after it is done testing and processing:
```
someProcess.onEnd = function() {
    // the pass property will return either true or false
    console.log(someProcess.pass);

    // the data will either give you the processed file or the error message
    console.log(someProcess.data);
}
```

4) Run the test with the `run()` method.

```
someProcess.run();
```

And you're set.

#### Writing Your Tests

Example test to pass in:
```
// tests must return true or return an error message (a string)
var test1 = function(csv) {
    if (true) {
        return true;    
    }
    else {
        return "Random error message";
    }
}
```

#### Async Processes

The module allows for asyncronous processes through the use of JS promises. In your process, just return the resolved promise object.

Example:
```
var readFile = function(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        var content = reader.readAsText(file);

        reader.onload = function() {
            resolve(reader.result);
        }
    }); 
};
```

## Developing
This project leverages gulp and mocha.

1. Download dependencies: `npm init`
2. Run compiler `gulp`

*It's now watching for changes, compiling and minifying, and running tests*

# Dharma
A tool for NodeJS projects to help run tests, generate code coverage, and anything else to help the testing process.

Dharma is heavily inspired by [Kharma](https://github.com/karma-runner/karma).

### Motivation
Coming from the browser world there is a clear path to running the tests, generating code coverage, and various other testing related activities with tools like
Kharma.  Coming into the NodeJS world it was difficult to find out how to make a build system that handles running tests and generating code coverage. 
Plugins exist but many of them are out of date or not being maintained anymore.

### Goals
* Simple plugin architecture 
* Support for runnings Jasmine tests
* Support for Istanbul code coverage
* Easily integrated with task runners like Grunt and Gulp

### Installation
```npm install dharma```

### Usage
```dharma --configFile=<path to config file>```

### Config File
See examples/jasmine/dharma.conf.js for an example

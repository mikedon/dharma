module.exports = {
	
	/**
	 * Top level directory to look for test files
	 */
	specDir: "./build",
	
	/**
	 * Glob pattern for matching test files within the specDir
	 */
	specFiles: ["**/*.spec.js"],
	
	/**
	 * Glob pattern for matching source files.  This is useful for 
	 * code coverage plugins
	 */
	srcFiles: ["./build/**/!(*.spec).js"],
	
	/**
	 * The Test framework to use.  Possible options are 'JasmineFramework'
	 */
	framework: "JasmineFramework",
	
	/**
	 * An array of preprocessor to activate.  Preprocessors run before the tests are run 
	 */
	preprocessors: ["IstanbulPreprocessor"],
	
	/**
	 * An array of reporters to activate.  Reporters run after the tests are executed.
	 */
	reporters: ["IstanbulReporter", "IstanbulThresholdReporter"],
	
	/**
	 * Indivisual plugins define their own configuration like this.  The convention is for the plugin to expect
	 * a property with the name matching the camel case version of the plugin name.  See documentation for each plugin
	 * to understand config options.
	 */
	jasmineFramework: {
		helpers: [],				
		reporters: [
			{
				name: "JUnitXmlReporter",
				config: {
					savePath: "build/tmp",
					filePrefix: "",
					consolidateAll: true
				}	
			},{
				name: "TapReporter",
				config: {
					
				}
			}
		]	
	},
	
	istanbulPreprocessor : {
		verbose: false	
	},
	
	istanbulThresholdReporter: {
		statements: 80,
		branches: 80,
		lines: 80,
		functions: 80
	},
	
	istanbulReporter: {
		outputDir: "build/tmp",
		reporters: ["html", "json"]
	}
}
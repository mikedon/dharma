module.exports = {
	specDir: "examples/jasmine/src",
	specFiles: ["**/*.spec.js"],
	srcFiles: ["examples/jasmine/src/**/!(*.spec).js"],
	
	framework: "JasmineFramework",
	
	preprocessors: ["IstanbulPreprocessor"],
	
	reporters: ["IstanbulReporter", "IstanbulThresholdReporter"],
	
	jasmineRunner: {
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
		statements: 100,
		branches: 100,
		lines: 100,
		functions: 100
	},
	
	istanbulReporter: {
		outputDir: "build/tmp",
		reporters: ["html", "json"]
	}
}
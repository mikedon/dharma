module.exports = {
	specDir: "src",
	specfiles: ["**/*.spec.js"],
	srcFiles: ["**/!(*.spec).js"],
	
	framework: "JasmineRunner",
	
	preprocessors: ["IstanbulPreprocesor"],
	
	reporters: ["IstanbulReporter", "IstanbulThresholdReporter"],
	
	jasmineRunner: {
		helpers: []	
	},
	
	istanbulPreprocessor : {
		verbose: true	
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
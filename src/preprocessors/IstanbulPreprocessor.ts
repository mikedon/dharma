import * as Bluebird from "bluebird";
import * as fs from "fs";

var Istanbul: any = require("istanbul");

export class IstanbulPreprocessor {
	
	private specFiles: string[];
	private srcFiles: string[];
	private verbose: boolean;
	
	constructor({specFiles, srcFiles = ["**/!(*.spec).js"], istanbulPreprocessor = {verbose: false}}){
		this.specFiles = specFiles;
		this.srcFiles = srcFiles;
		this.verbose = istanbulPreprocessor.verbose;	
	}
	
	public preprocess(): Promise<any>{		
		var hook = Istanbul.hook;     		
		var instrumenter = new Istanbul.Instrumenter({ /*coverageVariable: coverageVar , preserveComments: preserveComments*/});
        var transformer = instrumenter.instrumentSync.bind(instrumenter);
		var matcherFor:Function = Bluebird.promisify(Istanbul.matcherFor);	
		return matcherFor({
			excludes: ["**/node_modules/**"].concat(this.specFiles),
			includes: this.srcFiles
		}).then((matchFn: any) => {
			global["__coverage__"] = [];			
			matchFn.files.forEach(function (file) {             	
				transformer(fs.readFileSync(file, 'utf-8'), file);
				// When instrumenting the code, istanbul will give each FunctionDeclaration a value of 1 in coverState.s,
				// presumably to compensate for function hoisting. We need to reset this, as the function was not hoisted,
				// as it was never loaded.
				Object.keys(instrumenter.coverState.s).forEach(function(key) {
					instrumenter.coverState.s[key] = 0;
				});
				global["__coverage__"][file] = instrumenter.coverState;				
			 });
			hook.hookRequire(matchFn, transformer, {verbose: this.verbose});
		});								
	}		
}
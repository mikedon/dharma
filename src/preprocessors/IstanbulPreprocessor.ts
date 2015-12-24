import * as Bluebird from "bluebird";
import * as fs from "fs";

var Istanbul: any = require("istanbul");

export class IstanbulPreprocessor {
	
	private specFiles: string[];
	private srcFiles: string[];
	private verbose: boolean;
	private ignoreTsHelpers: boolean;
	
	constructor({specFiles = ["**/*.spec.js"], srcFiles = ["**/!(*.spec).js"], istanbulPreprocessor = {verbose: false, ignoreTsHelpers: true}}){
		this.specFiles = specFiles;
		this.srcFiles = srcFiles;
		this.verbose = istanbulPreprocessor.verbose;
		this.ignoreTsHelpers = istanbulPreprocessor.ignoreTsHelpers;
	}
	
	public preprocess(): Promise<any>{		
		var hook = Istanbul.hook;     		
		var instrumenter = new Istanbul.Instrumenter({ /*coverageVariable: coverageVar , preserveComments: preserveComments*/});
        var transformer = instrumenter.instrumentSync.bind(instrumenter);
		var matcherFor:Function = Bluebird.promisify(Istanbul.matcherFor);
		let tsHelperRegex = /var __(param|awaiter|metadata|decorate|extends)/;
			
		return matcherFor({
			excludes: ["**/node_modules/**"].concat(this.specFiles),
			includes: this.srcFiles
		}).then((matchFn: any) => {
			if(!global["__coverage__"]){			
				global["__coverage__"] = [];
			}			
			matchFn.files.forEach((file) => {
				let fileContents = fs.readFileSync(file, "utf-8");
				if(fileContents && this.ignoreTsHelpers){
					let linesOfCode = fileContents.split("\n");					
					for(let i = 0; i < linesOfCode.length; i++){	
						if(tsHelperRegex.test(linesOfCode[i])){
							console.log("adding istanbul ignore");
							linesOfCode.splice(i, 0, "/* istanbul ignore next */");
							i++;
						}						
					}  
					fileContents = new Buffer(linesOfCode.join('\n')).toString();  			
				}	         									
				transformer(fileContents, file);
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
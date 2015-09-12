declare var require: any;

import * as Bluebird from "bluebird";
import {Config} from "../dharma";
import * as fs from "fs";

// import * as istanbul from "istanbul";
var Istanbul: any = require("istanbul");

export class IstanbulPreprocessor {
	
	public preprocess(config: Config): Promise<any>{
		console.log("running preprocessor...");
		var hook = Istanbul.hook;     		
		var instrumenter = new Istanbul.Instrumenter({ /*coverageVariable: coverageVar , preserveComments: preserveComments*/});
        var transformer = instrumenter.instrumentSync.bind(instrumenter);
		var matcherFor:Function = Bluebird.promisify(Istanbul.matcherFor);	
		return matcherFor({
			excludes: ["**/node_modules/**"].concat(config.specs),
			includes: config.srcFiles			
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
			hook.hookRequire(matchFn, transformer, {verbose: true});
		});								
	}		
}
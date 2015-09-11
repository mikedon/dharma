declare var require: any;

import * as Bluebird from "bluebird";
import {Config} from "../dharma";

// import * as istanbul from "istanbul";
var Istanbul: any = require("istanbul");

export class IstanbulPreprocessor {
	
	public preprocess(config: Config): Promise<any>{
		console.log("running preprocessor...");
		var hook = Istanbul.hook;     		
		var instrumenter = new Istanbul.Instrumenter({ /*coverageVariable: coverageVar , preserveComments: preserveComments*/});
        var transformer = instrumenter.instrumentSync.bind(instrumenter);
		var matcherFor:Function = Bluebird.promisify(Istanbul.matcherFor);
		return matcherFor({excludes: config.specs}).then((matchFn: Function) => {			
			hook.hookRequire(matchFn, transformer, {verbose: true});
		});								
	}		
}
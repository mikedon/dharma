/// <reference path="../../typings/tsd.d.ts" />

declare var require: any;

import {Config} from "../dharma";
import {TestRunner} from "TestRunner";

var Jasmine: any = require("jasmine");

// TODO type declaration for jasmine
// import {Jasmine} from "jasmine";

export default class JasmineRunner implements TestRunner{		
	
	public runTests(config: Config){
		var jasmine = new Jasmine();
		jasmine.loadConfig({
			spec_dir: config.specDir,
    		spec_files: config.specs,
    		helpers: config.helpers
		});
		jasmine.onComplete((passed: boolean) => {
			console.log(`Did the tests pass? - ${passed}`);
		});
		jasmine.execute();	
	}
}
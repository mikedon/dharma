/// <reference path="../../typings/tsd.d.ts" />

declare var require: any;

import {Config} from "../dharma";
import {TestRunner} from "TestRunner";

var Jasmine: any = require("jasmine");

// TODO type declaration for jasmine
// import {Jasmine} from "jasmine";

export class JasmineRunner implements TestRunner{		
	
	public runTests(config: Config){
		var jasmine = new Jasmine();		
		jasmine.loadConfig({
			spec_dir: config.specDir || ".",
    		spec_files: config.specs,
    		helpers: config.helpers
		});
		jasmine.onComplete((passed: boolean) => {			
		});
		jasmine.execute();	
	}
}
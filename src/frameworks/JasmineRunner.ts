/// <reference path="../../typings/tsd.d.ts" />

declare var require: any;

import * as Bluebird from "bluebird";
import {Config} from "../dharma";
import {TestRunner} from "TestRunner";

var Jasmine: any = require("jasmine");

// TODO type declaration for jasmine
// import {Jasmine} from "jasmine";

export class JasmineRunner{		
	
	public runTests(config: Config): Promise<any>{
		console.log("running tests...");
		var deferred = Bluebird.defer();
		var jasmine = new Jasmine();		
		jasmine.loadConfig({
			spec_dir: config.specDir || ".",
    		spec_files: config.specs,
    		helpers: config.helpers
		});
		jasmine.onComplete((passed: boolean) => {
			deferred.resolve();			
		});
		jasmine.execute();
		return deferred.promise;	
	}
}
declare var global: any;

import {Config} from "../dharma";
import * as Bluebird from "bluebird";

var Istanbul: any = require("istanbul");

export class IstanbulThresholdReporter {
	
	public report(config: Config): Promise<any> {
		console.log("running threshold reporter...");
		var utils = Istanbul.utils;
		var coverage = global["__coverage__"];		
		var collector = new Istanbul.Collector();
		collector.add(coverage);
		
		var thresholds: any = {
			statements: 100,
			branches: 100,
			lines: 100,
			functions: 100
		};
		var failed = false;
		var globalResults = utils.summarizeCoverage(collector.getFinalCoverage());
		[
			"statements",
			"branches",
			"lines",
			"functions"
		].forEach(function (key) {						
			var actual = globalResults[key].pct;
			var actualUncovered = globalResults[key].total - globalResults[key].covered;
			var threshold = thresholds[key];			
			if (actual < threshold) {
				console.log(`coverage threshold not reached for ${key}`);
				failed = true;
			}
		});		
		if(failed){
			return Bluebird.reject(failed);
		}else{
			return Bluebird.resolve();	
		}		
	}
}
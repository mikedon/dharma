import * as Bluebird from "bluebird";

var Istanbul: any = require("istanbul");

export class IstanbulThresholdReporter {
	
	private statements: number;
	private branches: number;
	private lines: number;
	private functions: number;
	
	constructor({istanbulThresholdReporter = {statements : 80, branches : 80, lines : 80, functions : 80}}){
		this.statements = istanbulThresholdReporter.statements;
		this.branches = istanbulThresholdReporter.branches;
		this.lines = istanbulThresholdReporter.lines;
		this.functions = istanbulThresholdReporter.functions;			
	}
	
	public report(): Promise<any> {		
		var utils = Istanbul.utils;
		var coverage = global["__coverage__"];		
		var collector = new Istanbul.Collector();
		collector.add(coverage);
		
		var thresholds: any = {
			statements: this.statements,
			branches: this.branches,
			lines: this.lines,
			functions: this.functions
		};
		var failed = false;
		console.log(`==================== Coverage / Threshold summary =============================`);
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
				failed = true;
			}
			console.log(`${key}  : ${actual}% ( ${globalResults[key].covered}/${globalResults[key].total} ) : Threshold : ${threshold}%`);
		});
		console.log(`================================================================================`);
		
		if(failed){
			return Bluebird.reject("Code coverage threshold not reached.  See report for more details.");
		}else{
			return Bluebird.resolve();	
		}		
	}
}
import * as Bluebird from "bluebird";

var Istanbul: any = require("istanbul");

export class IstanbulThresholdReporter {
	
	private statements: number;
	private branches: number;
	private lines: number;
	private functions: number;
	
	constructor({statements = 80, branches = 80, lines = 80, functions = 80}){
		this.statements = statements;
		this.branches = branches;
		this.lines = lines;
		this.functions = functions;	
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
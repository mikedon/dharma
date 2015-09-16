import * as Bluebird from "bluebird";

var Istanbul: any = require("istanbul");

export class IstanbulReporter {
	
	private outputDir: string;
	private reporters: string[];
	
	constructor({istanbulReporter = {outputDir: "./build", reporters: ["html"]}}) {
		this.outputDir = istanbulReporter.outputDir;
		this.reporters = istanbulReporter.reporters;		
	}
	
	public report(): Promise<any>{
		var istanbulReporters: any[] = [];
		for(var reporter of this.reporters){
			istanbulReporters.push(Istanbul.Report.create(reporter, {dir: `${this.outputDir}/${reporter}`}));
		}				 		
		var coverage = global["__coverage__"];
		var collector = new Istanbul.Collector();
		collector.add(coverage);
		return Bluebird.all(istanbulReporters.map((report) => {
			return Bluebird.resolve(report.writeReport(collector, true));	
		}));								
	}
}
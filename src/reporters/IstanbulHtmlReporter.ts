declare var require: any;
declare var global: any;

import {Config} from "../dharma";
import * as Bluebird from "bluebird";
import * as glob from "glob";
import * as fs from "fs";

var Istanbul: any = require("istanbul");

export class IstanbulHtmlReporter {
	
	public report(config: Config): Promise<any>{
		console.log("running html report...");
		var report = Istanbul.Report.create('html', {dir: `${config.outputDir}/html-report`});		
		var coverage = global["__coverage__"];
		var collector = new Istanbul.Collector();
		collector.add(coverage);						
		return Bluebird.resolve(report.writeReport(collector, true));
	}
}
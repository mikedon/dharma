declare var require: any;
declare var global: any;

import {Config} from "../dharma";
import * as Bluebird from "bluebird";

var Istanbul: any = require("istanbul");

export class IstanbulReporter {
	
	public report(config: Config): Promise<any>{
		console.log("running html report...");
		var report = Istanbul.Report.create('html');		
		var coverage = global["__coverage__"];
		var collector = new Istanbul.Collector();
		collector.add(coverage);
		
		//TODO we also want coverage for those files not required but in src		
		return Bluebird.resolve(report.writeReport(collector, true));
	}
}
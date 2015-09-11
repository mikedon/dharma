declare var require: any;
declare var global: any;

import {Config} from "../dharma";
import * as Bluebird from "bluebird";
import * as glob from "glob";
import * as fs from "fs";

var Istanbul: any = require("istanbul");

export class IstanbulReporter {
	
	public report(config: Config): Promise<any>{
		console.log("running html report...");
		var report = Istanbul.Report.create('html');		
		var coverage = global["__coverage__"];
		var collector = new Istanbul.Collector();
		collector.add(coverage);
		
		//TODO we also want coverage for those files not required but in src
		var instrumenter = new Istanbul.Instrumenter({ /*coverageVariable: coverageVar , preserveComments: preserveComments*/});
        var transformer = instrumenter.instrumentSync.bind(instrumenter);
		for(var srcPattern of config.srcFiles){
			console.log(srcPattern);
			glob(srcPattern, (err: Error, matches: string[]) => {
				for(var file of matches){					
					if(!coverage[file]){
						console.log(file);
						transformer(fs.readFileSync(file, 'utf-8'), file);
						Object.keys(instrumenter.coverState.s).forEach(function (key) {
                        	instrumenter.coverState.s[key] = 0;
                        });
						coverage[file] = instrumenter.coverState;
					}	
				}
					
			});
		}		
		return Bluebird.resolve(report.writeReport(collector, true));
	}
}
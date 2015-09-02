/// <reference path="../typings/tsd.d.ts" />

import * as parseArgs from "minimist";
import {Dharma, Config} from "./dharma";

declare var process: any;

export function run(){
	var args: parseArgs.ParsedArgs = parseArgs(process.argv.slice(2));
	var cmd: string = args._.shift();
	var config: Config = {
		specs: args["specs"] || ["**/*.spec.js"],
		helpers: args["helpers"] || [],
		specDir: args["specDir"] || ".",
		srcFiles: args["srcFiles"] || ["**/*.js"]
	};
	
	var dharma = new Dharma(config);
	switch(cmd){
		case "test":
			dharma.runPreprocessors();								
			dharma.runTests();
			dharma.runReporters();
			break;		
		case "help":
			console.log("HELP ME");
			break;
		default:
			break;		
	}
}

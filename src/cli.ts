/// <reference path="../typings/tsd.d.ts" />

import * as parseArgs from "minimist";
import {Dharma} from "./dharma";

declare var process: any;

export function run(){
	var args: parseArgs.ParsedArgs = parseArgs(process.argv.slice(2));
	var cmd: string = args._.shift();
	console.log("Starting Dharma...");	
	var dharma = new Dharma("./frameworks/JasmineRunner", [], []);
	switch(cmd){
		case "test":								
			dharma.runTests();
			break;
		case "help":
			console.log("HELP ME");
			break;
		default:
			break;		
	}
}

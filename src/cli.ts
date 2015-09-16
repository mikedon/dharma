import * as parseArgs from "minimist";
import {Dharma} from "./dharma";

declare var process: any;

export function run(){
	var args: parseArgs.ParsedArgs = parseArgs(process.argv.slice(2));
	var cmd: string = args._.shift();	
	var dharma = new Dharma(args["configFile"]);
	switch(cmd){
		case "run":
			dharma.run();			
			break;		
		case "help":
			console.log("HELP ME");
			break;
		default:
			break;		
	}
}

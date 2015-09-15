import * as parseArgs from "minimist";
import {Dharma} from "./dharma";

declare var process: any;

export function run(){
	var args: parseArgs.ParsedArgs = parseArgs(process.argv.slice(2));
	var cmd: string = args._.shift();
	var config: any = {};
	for(var arg in args){
		if(arg.indexOf(",") > -1){
			args[arg] = args[arg].split(",");
		}
		if(arg !== "_"){
			config[arg] = args[arg];
		}
	}
	console.log(config);		
	var dharma = new Dharma(config);
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

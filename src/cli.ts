import * as parseArgs from "minimist";
import {Dharma, Config} from "./dharma";

declare var process: any;

export function run(){
	var args: parseArgs.ParsedArgs = parseArgs(process.argv.slice(2));
	var cmd: string = args._.shift();
	if(args["specs"]){
		args["specs"] = args["specs"].split(",");
	}
	if(args["helpers"]){
		args["helpers"] = args["helpers"].split(",");
	}		
	if(args["srcFiles"]){
		args["srcFiles"] = args["srcFiles"].split(",");
	}
	var config = new Config(args);
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

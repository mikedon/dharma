import * as parseArgs from "minimist";
import {Dharma} from "./dharma";

declare var process: any;

export function run(){
	var args: parseArgs.ParsedArgs = parseArgs(process.argv.slice(2));
	var cmd: string = args._.shift();	
	var dharma = new Dharma(args["configFile"]);
	switch(cmd){
		case "run":			
			dharma.run().then(()=>{
				console.log("Dharma execution completed succesfully");
				process.exit(0);
			}).catch((err) => {
				console.error(err);
				process.exit(1);
			});			
			break;		
		case "help":
			console.log("HELP ME");
			break;
		default:
			break;		
	}
}

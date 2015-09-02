declare var require: any;

import * as fs from "fs";
import * as glob from "glob";
import {Config} from "../dharma";

var Istanbul: any = require("istanbul");

export class IstanbulPreprocessor {
	
	public preprocess(config: Config){
		//TODO I think we need to move everything to a staging directory, specs and instrumented code
				
		var filesToIgnore: string[] = [];
		var instrumenter = new Istanbul.Instrumenter();
		config.specs.forEach((specFile: string) => {
			glob(specFile, (err: Error, matches: string[])=> {
				filesToIgnore = filesToIgnore.concat(matches);
			});
		});		
		config.srcFiles.forEach((srcFile: string)=>{
			glob(srcFile, (err: Error, matches: string[])=> {
				matches.forEach((file: string) => {
					if(filesToIgnore.indexOf(file) < 0){
						fs.readFile(file, (err: NodeJS.ErrnoException, data: Buffer) => {
							var generatedCode = instrumenter.instrumentSync(data.toString(), file);
							fs.writeFile(`${config.outputDir}`, generatedCode);
							console.log(generatedCode);				
						});
					}
				})						
			});
		});						
	}		
}
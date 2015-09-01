declare var require:any;

import {TestRunner} from "frameworks/TestRunner";

export interface Config {
	specs: string[];
	helpers?: string[];
	specDir?: string;
}

export class Dharma {
	
	constructor(private framework: string, private preprocessors: string[], private reporters: string[]){
		
	}	
	
	public runPreprocessors(){
		
	}
	
	public runTests(){		 
		//TODO how to dynamically import modules with typescript
		var testRunner = require(this.framework);		
		console.log(testRunner);
		var runner = new testRunner.default(); 
		runner.runTests({
			specs: ["spec.js"]			
		});
	}
	
	public runReporters(){
		
	}
}
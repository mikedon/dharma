declare var require:any;

import {JasmineRunner} from "./frameworks/JasmineRunner"; 
import {IstanbulPreprocessor} from "./preprocessors/IstanbulPreprocessor";

export interface Config {
	specs?: string[];
	helpers?: string[];
	specDir?: string;
	srcFiles?: string[];
	outputDir?: string;
}

export class Dharma {
	
	constructor(private config: Config){
		
	}	
	
	public runPreprocessors(){
		var preprocessor = new IstanbulPreprocessor();
		preprocessor.preprocess(this.config);
	}
	
	public runTests(){		 
		var runner = new JasmineRunner(); 
		runner.runTests(this.config);
	}
	
	public runReporters(){
		
	}
}
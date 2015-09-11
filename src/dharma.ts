import * as Bluebird from "bluebird";
import {JasmineRunner} from "./frameworks/JasmineRunner"; 
import {IstanbulPreprocessor} from "./preprocessors/IstanbulPreprocessor";
import {IstanbulReporter} from "./reporters/IstanbulReporter";
import {IstanbulThresholdReporter} from "./reporters/IstanbulThresholdReporter";

export class Config {
	specs: string[];
	helpers: string[];
	specDir: string;
	srcFiles: string[];	
	
	constructor({specs = ["**/*.spec.js"], helpers = [], specDir = ".", srcFiles = []}){
		this.specs = specs;
		this.helpers = helpers;
		this.specDir = specDir;
		this.srcFiles = srcFiles;
	}	
}

export class Dharma {
	
	constructor(private config: Config){
		
	}	
	
	public run(){
		this.runPreprocessors()
		.then(()=>{
			this.runTests();
		})
		.then(()=>{
			this.runReporters().catch((err) => {
				throw "fail";
			});
		});
	}
	
	private runPreprocessors(): Promise<any>{
		var preprocessor = new IstanbulPreprocessor();
		return preprocessor.preprocess(this.config);		
	}
	
	private runTests(): Promise<any>{		 
		var runner = new JasmineRunner(); 
		return runner.runTests(this.config);		
	}
	
	private runReporters(): Promise<any>{
		var istanbulReporter = new IstanbulReporter();
		var thresholdReporter = new IstanbulThresholdReporter();
		return istanbulReporter.report(this.config).then(() => {return thresholdReporter.report(this.config)});		
	}
}
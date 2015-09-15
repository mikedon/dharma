/// <reference path="../typings/tsd.d.ts"/>

import * as fs from "fs";
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
	outputDir: string;
	
	constructor({specs = ["**/*.spec.js"], helpers = [], specDir = ".", srcFiles = [], outputDir = "./build"}){
		this.specs = specs;
		this.helpers = helpers;
		this.specDir = specDir;
		this.srcFiles = srcFiles;
		this.outputDir = outputDir;
	}	
}

export class Dharma {
	
	constructor(private configFile: string){
		//TODO read configFile
		// Bluebird.resolve(fs.readFileSync
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
		var preprocessor = new IstanbulPreprocessor(this.config);
		return preprocessor.preprocess();		
	}
	
	private runTests(): Promise<any>{		 
		var runner = new JasmineRunner(this.config); 
		return runner.runTests();		
	}
	
	private runReporters(): Promise<any>{
		var istanbulReporter = new IstanbulReporter(this.config);
		var thresholdReporter = new IstanbulThresholdReporter(this.config);
		return Bluebird.all([istanbulReporter.report(), thresholdReporter.report()]);		
	}
}
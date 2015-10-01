import * as fs from "fs";
import * as Bluebird from "bluebird";
import * as path from "path";
import {DharmaPreprocessor} from "./preprocessors/DharmaPreprocessor";
import {DharmaFramework} from "./frameworks/DharmaFramework";
import {DharmaReporter} from "./reporters/DharmaReporter";

export class Config {
	specs: string[];
	helpers: string[];
	specDir: string;
	srcFiles: string[];	
	outputDir: string;
	framework: string;
	preprocessors: string[];
	reporters: string[];
	
	constructor({specs = ["**/*.spec.js"], helpers = [], specDir = ".", srcFiles = [], outputDir = "./build", framework, preprocessors, reporters}){
		this.specs = specs;
		this.helpers = helpers;
		this.specDir = specDir;
		this.srcFiles = srcFiles;
		this.outputDir = outputDir;
		this.framework = framework;
		this.preprocessors = preprocessors
		this.reporters = reporters;
	}	
}

export class Dharma {
	
	private config: Config;
	
	constructor(private configFile: string){
		var root = this.findRoot(process.cwd());		
		this.config = this.loadModule(`${root}/${configFile}`);				
	}	
	
	public run(): Promise<any>{
		return this.runPreprocessors()
		.then(()=>{
			return this.runTests();
		})
		.then(()=>{
			return this.runReporters();							
		}).catch((err) => {
			throw err;
		});
	}
	
	private runPreprocessors(): Promise<any>{		
		var promises: Promise<any>[] = [];
		for(var preprocessor of this.config.preprocessors){
			var preprocessorModule: any;
			try{
				preprocessorModule = this.loadModule(preprocessor);	
			}catch(err){
				preprocessorModule = this.loadModule(`./preprocessors/${preprocessor}`)
			}								
			promises.push(new preprocessorModule[preprocessor](this.config).preprocess());												
		}						
		return Bluebird.all(promises);
	}
	
	private runTests(): Promise<any>{
		var frameworkModule: any;
		try{
			frameworkModule = this.loadModule(this.config.framework);	
		}catch(err){
			frameworkModule = this.loadModule(`./frameworks/${this.config.framework}`);
		}				 
		return new frameworkModule[this.config.framework](this.config).runTests();				
	}
	
	private runReporters(): Promise<any>{
		var promises: Promise<any>[] = [];
		for(var reporter of this.config.reporters){
			
			var reporterModule: any;
			try{
				reporterModule = this.loadModule(reporter);
			}catch(err){
				reporterModule = this.loadModule(`./reporters/${reporter}`);
			}
			promises.push(new reporterModule[reporter](this.config).report()); 
		} 
		return Bluebird.all(promises);				
	}
	
	private findRoot(dir: string){
		if(fs.existsSync(path.join(dir, "package.json"))){
			return dir;	
		}else{
			var tokens = dir.split(path.sep);
			tokens.pop();			
			return this.findRoot(tokens.join(path.sep));
		}		
	}
	
	private loadModule(module: string): any{
		return require(module);
	}
}

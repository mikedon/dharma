import * as Bluebird from "bluebird";

var Jasmine: any = require("jasmine");
var jasmineReporters: any = require("jasmine-reporters"); 

export class JasmineFramework{		
	
	private specDir: string;
	private specFiles: string[];
	private helpers: string[];
	private showColors: boolean;
	private reporters: {name: string; config: any}[];
	
	constructor({specDir = ".", specFiles = ["**/*.spec.js"], jasmineRunner = {helpers: [], showColors: true, reporters: [], outputDir: "tmp/"}}){
		this.specDir = specDir;
		this.specFiles = specFiles;
		this.helpers = jasmineRunner.helpers;
		this.showColors = jasmineRunner.showColors;
		this.reporters = jasmineRunner.reporters;			
	}
	
	public runTests(): Promise<any>{		
		var deferred = Bluebird.defer();
		var jasmine = new Jasmine();			
		jasmine.loadConfig({
			spec_dir: this.specDir,
    		spec_files: this.specFiles,
    		helpers: this.helpers
		});
		jasmine.onComplete((passed: boolean) => {
			deferred.resolve();			
		});
		
		jasmine.configureDefaultReporter({    		    		
    		showColors: this.showColors	
		});
		
		for(var {name: n, config: c} of this.reporters){						
			var jasmineReporter = new jasmineReporters[n](c);						
			jasmine.addReporter(jasmineReporter);
		}
		
		jasmine.execute();
		return deferred.promise;	
	}
}
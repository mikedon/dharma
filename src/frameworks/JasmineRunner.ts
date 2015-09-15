import * as Bluebird from "bluebird";

var Jasmine: any = require("jasmine");

export class JasmineRunner{		
	
	private specDir: string;
	private specFiles: string[];
	private helpers: string[];
	
	constructor({specDir = ".", specFiles = ["**/*.spec.js"], helpers = []}){
		this.specDir = specDir;
		this.specFiles = specFiles;
		this.helpers = helpers;	
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
		jasmine.execute();
		return deferred.promise;	
	}
}
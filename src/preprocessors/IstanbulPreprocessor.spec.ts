var proxyquire: Proxyquire = require("proxyquire");//.noPreserveCache();

var IstanbulMock = {		
};

var fsMock = {
	readFileSync: function(){
		
	}
}

var BluebirdMock = {
	promisify: function(method){
		return method;
	}
}

var IstanbulPreprocessor = proxyquire("./IstanbulPreprocessor", {"istanbul": IstanbulMock, "bluebird": BluebirdMock, "fs": fsMock});
describe("Istanbul Preprocessor Plugin", function(){
	it("should default configurations", function(){			
		let istanbulPreprocessor: any = new IstanbulPreprocessor.IstanbulPreprocessor({});			
		expect(istanbulPreprocessor.specFiles.length).toBe(1);
		expect(istanbulPreprocessor.specFiles[0]).toBe("**/*.spec.js");
		expect(istanbulPreprocessor.srcFiles.length).toBe(1);
		expect(istanbulPreprocessor.srcFiles[0]).toBe("**/!(*.spec).js");
		expect(istanbulPreprocessor.verbose).toBeFalsy();
	});
	
	it("should instrument all src files and no spec files", function(){
		let istanbulPreprocessor = new IstanbulPreprocessor.IstanbulPreprocessor({});
		spyOn(IstanbulMock["hook"], "hookRequire").and.callFake(function(){				
		});
		spyOn(IstanbulMock, "Instrumenter").and.returnValue({
			instrumentSync: function(){
				return function(){
					
				}	
			},
			coverState: {
				s: {
					"statements": -1
				}
			}
		});
		spyOn(IstanbulMock, "matcherFor").and.returnValue({
			then: function(callback){					
				callback({
					files: ["file1.txt"] //TODO add a fake file here	
				});
			}
		});									
		istanbulPreprocessor.preprocess();
		expect(IstanbulMock["matcherFor"]).toHaveBeenCalled();
		expect(IstanbulMock["hook"].hookRequire).toHaveBeenCalled();
		expect(global["__coverage__"]["file1.txt"]).toBeDefined();
		expect(global["__coverage__"]["file1.txt"].s.statements).toBe(0);		
		delete global["__coverage__"]["file1.txt"];  // Don't forget to remove anything the test adds to the global scope!			
	});
});
var proxyquire: Proxyquire = require("proxyquire");
var Dharma = proxyquire("./dharma", {});

var fakePromise = function(){
	
};

fakePromise.prototype.catch = function(callback){
	// callback();
	return new fakePromise();	
}

fakePromise.prototype.then = function(callback){
	callback();
	return new fakePromise();	
}

describe("Dharma", function(){
	it("should find and load the dharma config file", function(){
		spyOn(Dharma.Dharma.prototype, "findRoot");
		spyOn(Dharma.Dharma.prototype, "loadModule").and.callFake(function(){
			
		});
		let dharma = new Dharma.Dharma("dharma.conf.js");
		expect(Dharma.Dharma.prototype["findRoot"]).toHaveBeenCalled();
		expect(Dharma.Dharma.prototype["loadModule"]).toHaveBeenCalled();
	});
	
	it("should invoke preprocessors, then frameworks, then reporters", function(){		
		spyOn(Dharma.Dharma.prototype, "loadModule").and.callFake(function(){
			
		});
		spyOn(Dharma.Dharma.prototype, "runPreprocessors").and.returnValue(new fakePromise());
		spyOn(Dharma.Dharma.prototype, "runTests").and.returnValue(new fakePromise());
		spyOn(Dharma.Dharma.prototype, "runReporters").and.returnValue(new fakePromise());
		let dharma = new Dharma.Dharma("");
		dharma.run();
		expect(Dharma.Dharma.prototype["runPreprocessors"]).toHaveBeenCalled();
		expect(Dharma.Dharma.prototype["runTests"]).toHaveBeenCalled();
		expect(Dharma.Dharma.prototype["runReporters"]).toHaveBeenCalled();
	});
	
	it("should load all configured preprocessors", function(){
		var preprocessor1 = function(){
			
		};
		preprocessor1.prototype.preprocess = function(){
			
		};
		spyOn(Dharma.Dharma.prototype, "loadModule").and.returnValue({
			"preprocessor1": preprocessor1	
		});
		let dharma = new Dharma.Dharma("");
		dharma.config.preprocessors = ["preprocessor1"];
		dharma.runPreprocessors();
		expect(Dharma.Dharma.prototype.loadModule).toHaveBeenCalled();
	});
	
	it("should load the configured framework", function(){
		var framework1 = function(){
			
		};
		framework1.prototype.runTests = function(){
			
		};
		spyOn(Dharma.Dharma.prototype, "loadModule").and.returnValue({
			"framework1": framework1
		});
		let dharma = new Dharma.Dharma("");
		dharma.config.framework = "framework1";
		dharma.runTests();
		expect(Dharma.Dharma.prototype.loadModule).toHaveBeenCalled();
	});
	
	it("should load all configured reporters", function(){
		var reporter1 = function(){
			
		};
		reporter1.prototype.report = function(){
			
		};
		spyOn(Dharma.Dharma.prototype, "loadModule").and.returnValue({
			"reporter1": reporter1	
		});
		let dharma = new Dharma.Dharma("");
		dharma.config.reporters = ["reporter1"];
		dharma.runReporters();
		expect(Dharma.Dharma.prototype.loadModule).toHaveBeenCalled();
	});
});
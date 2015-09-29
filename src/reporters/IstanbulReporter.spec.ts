var proxyquire: Proxyquire = require("proxyquire");

var IstanbulMock = {
	
};

var BluebirdMock = {
	promisify: function(method){
		return method;
	}	
};

var IstanbulReporter = proxyquire("./IstanbulReporter",{"istanbul": IstanbulMock, "bluebird": BluebirdMock});

describe("Istanbul Reporter Plugin", function(){
	it("should default configurations", function(){
		let ir: any = new IstanbulReporter.IstanbulReporter({});
		expect(ir.outputDir).toBe("./build");
		expect(ir.reporters.length).toBe(1);
		expect(ir.reporters[0]).toBe("html");
	});
	
	it("should register all configured reporters", function(){
		spyOn(IstanbulMock["Report"], "create").and.callFake(function(reporter: string, config: any){
			return {				
				writeReport: function(){
					return {
						reporter: reporter, 
						config: config,		
					}
				}
			};
		});
		spyOn(IstanbulMock, "Collector").and.returnValue({
			add: function(coverageVar){
				
			}
		});
		spyOn(BluebirdMock, "all").and.callFake(function(promiseArr){
			return promiseArr;
		});
		spyOn(BluebirdMock, "resolve").and.callFake(function(obj){
			return obj;
		});
		let ir: any = new IstanbulReporter.IstanbulReporter({});
		var promises = ir.report();
		expect(promises.length).toBe(1);
		expect(promises[0].reporter).toBe("html");
		expect(promises[0].config.dir).toBe("./build/html");
	});
});
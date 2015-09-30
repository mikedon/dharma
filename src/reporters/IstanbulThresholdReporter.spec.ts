var proxyquire: Proxyquire = require("proxyquire");

var IstanbulMock = {

};

var BluebirdMock = {
	promisify: function(method){
		return method;
	}	
};

var IstanbulThresholdReporter = proxyquire("./IstanbulThresholdReporter", {"istanbul": IstanbulMock, "bluebird": BluebirdMock}); 

describe("Istanbul Threshold Reporter Plugin", function(){
	it("should default configurations", function(){
		let itr: any = new IstanbulThresholdReporter.IstanbulThresholdReporter({});
		expect(itr.statements).toBe(80);
		expect(itr.branches).toBe(80);
		expect(itr.lines).toBe(80);
		expect(itr.functions).toBe(80); 
	});
	
	it("should resolve if code coverage threshold is met", function(){
		let itr: any = new IstanbulThresholdReporter.IstanbulThresholdReporter({});
		spyOn(itr, "getGlobalResults").and.returnValue({							
			"statements": {
				total: 10,
				covered: 9,
				pct: 90
			},
			"branches": {
				total: 10,
				covered: 9,
				pct: 90
			},
			"lines": {
				total: 10,
				covered: 9,
				pct: 90
			},
			"functions": {
				total: 10,
				covered: 9,
				pct: 90
			}							
		});
		spyOn(IstanbulMock, "Collector").and.returnValue({
			add: function(){
				
			},
			getFinalCoverage: function(){
				
			}
		});
		spyOn(BluebirdMock, "resolve").and.returnValue(true);
		
		let result = itr.report();
		expect(result).toBeTruthy();		
	});
	
	it("should reject if code coverage threshold is not met", function(){
		let itr: any = new IstanbulThresholdReporter.IstanbulThresholdReporter({});
		spyOn(itr, "getGlobalResults").and.returnValue({							
			"statements": {
				total: 10,
				covered: 8,  //uh oh!
				pct: 79
			},
			"branches": {
				total: 10,
				covered: 9,
				pct: 90
			},
			"lines": {
				total: 10,
				covered: 9,
				pct: 90
			},
			"functions": {
				total: 10,
				covered: 9,
				pct: 90
			}							
		});
		spyOn(IstanbulMock, "Collector").and.returnValue({
			add: function(){
				
			},
			getFinalCoverage: function(){
				
			}
		});
		spyOn(BluebirdMock, "reject").and.returnValue(false);
		
		let result = itr.report();
		expect(result).toBeFalsy();
	});
});
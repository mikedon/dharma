var proxyquire: Proxyquire = require("proxyquire");

var mockDharma = {
	
}

var mockParseArgsWithRun = function(){
	return {_:["run"],configFile:"conf.js"};	 
};

var mockParseArgsWithHelp = function(){
	return {_:["help"],configFile:"conf.js"};	 
};

describe("Dharma CLI", function(){
	it("should support the run command", function(){
		let cli = proxyquire("./cli", {"minimist": mockParseArgsWithRun, "./dharma": mockDharma});		
		spyOn(mockDharma["Dharma"].prototype, "loadModule").and.callFake(function(){
			
		});		
		spyOn(process,"exit").and.callFake(function(){
			
		});
		spyOn(mockDharma["Dharma"].prototype, "run").and.returnValue({
			then: function(callback){
				callback();
				return {
					catch: function(){
						
					}
				}
			}
		});				
		cli.run();		
		expect(mockDharma["Dharma"].prototype.run).toHaveBeenCalled();
		expect(process.exit).toHaveBeenCalled();
	});
	
	it("should support the help policy", function(){
		let cli = proxyquire("./cli", {"minimist": mockParseArgsWithHelp, "./dharma": mockDharma});
		spyOn(mockDharma["Dharma"].prototype, "loadModule").and.callFake(function(){
			
		});	
		cli.run();
	});
});
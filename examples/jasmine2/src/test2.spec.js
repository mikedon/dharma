var test = require("./test2");

describe("Jasmine Test", function(){
	it("should require test", function(){
		expect(test).toBeDefined();
		expect(test()).toBe("test");	
	});
});
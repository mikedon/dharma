import * as Bluebird from "bluebird";

export interface DharmaFramework {
	(config: any);
	runTests(): Promise<any>;
}
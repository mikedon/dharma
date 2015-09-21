import * as Bluebird from "bluebird";

export interface DharmaReporter {
	(config: any);
	report(config: any): Promise<any>;
}
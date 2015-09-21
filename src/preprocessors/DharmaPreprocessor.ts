import * as Bluebird from "bluebird";

export interface DharmaPreprocessor {
	(config: any);
	preprocess(config: any): Promise<any>;
}
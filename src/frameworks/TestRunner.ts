import {Config} from "../dharma";

export interface TestRunner {
	
	runTests(config: Config): void;
}
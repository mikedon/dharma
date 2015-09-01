declare module "jasmine" {
	interface Config {
		
	}
	
	interface DefaultReporterConfig {
		
	}
	
	class Jasmine {
		public loadConfigFile(file:string): void;
		public loadConfig(config: Config): void;
		
		public onComplete(callback: Function): void;
		
		public configureDefaultReporter(config: DefaultReporterConfig): void;
		public addReporter(reporter: any): void;
		
		public execute(): void;
		public execute(specs: string[], filter: string): void;
	}
}
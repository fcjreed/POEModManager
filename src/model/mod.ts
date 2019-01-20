export class Mod {

	constructor(		
		public name: string,
		public version: string,
		public installed: boolean,
		public newVersion: string,
		public activated: boolean,
		public executeType: string,
		public executablePath: string,
		public downloadUrls: Array<string>) {}

}

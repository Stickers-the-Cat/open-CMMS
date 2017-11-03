class activity_launch<activities> {

	core:core;
	constructor( core:core ) {

		this.core = core;
		this.core.template.load('launch');
		console.log('testing');
	}

	destory() {}
}

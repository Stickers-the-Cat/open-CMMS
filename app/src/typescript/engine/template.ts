class template {
	
	core:core;
	raw:any;
	renderer:HandlebarsTemplatable;
	constructor( core:core ){

	}

	/**
	* gets view requested by activity
	*
	* @param string id  - name of the view to be called 
	* @param string ele - name of the div to be shown
	*/
	load( id:string, ele:any = null ) {

		var request = $.ajax({
			url: 'assets/templates/'+id+'.html',
			method: 'GET'
		});

		request.done(function( html ) {

			//$('#'+( ele == null ? 'blocks > #main-block > #page > #content' : ele ) ).html(html);

			this.raw = html;
			this.renderer = Handlebars.compile(this.raw);
			$('#'+( ele == null ? 'block' : ele ) ).html( this.renderer({ test: 'testing' }) );
		});

		request.fail(function( jqXHR, textStatus ) {

			alert( 'Failed loading activity' );
		});
	}
}

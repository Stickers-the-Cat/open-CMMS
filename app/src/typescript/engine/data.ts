/**
 * 
 */
class data {
	
	get( field: string ) {
		
		return window.localStorage.getItem( field );
	}
	
	set ( field: string, value: any ) {
		
		return window.localStorage.setItem( field, value );
	}

	from_file( field: string, file: string ) {
		
		var request = $.ajax({
			url: file,
			method: 'GET'
		});
		
		request.done(function( data ) {
		
			this.set( field, data );
		});
		
		request.fail(function( jqXHR, textStatus ) {
		
			this.set( field, false );
		});
	}

	json( file: string, callback: any ) {
		
		var request = $.ajax({
			dataType: "json",
			url: file
		});

		request.done(function( json ){

			console.log( json );
			if(typeof callback === 'function' ) callback(json);
		});
		
		request.fail(function( jqXHR, textStatus ) {

			alert( "Request failed: " + textStatus );
		});

		console.log( 'loaded: '+ file );
	}
}
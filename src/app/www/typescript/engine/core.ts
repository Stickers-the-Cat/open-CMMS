/**
 * the main system, holds all other classes
 */

class core {

	/**
	 * holds the active activity
	 */
	activity:activities = null;
	/**
	 * holds the data class
	 */
	data:data = new data();
	/**
	 * holds the network API
	 */
	//network:network = new network();
	/**
	 * holds the view class
	 */
	template:template = new template( this );
	/**
	 * 
	 */
	//user:user;
	
		constructor() {
	
			document.addEventListener('deviceready', this.init.bind(this), false);
			this.init();
		}
	
		/**
		 * things that are needed when the game lunches
		 */
		private init() {
	
			this.load_activity( activity_launch, {} );
		}
	
		/**
		 * runs the requested activity, or assigns a class (i.g story or tut) to the activity holder
		 * 
		 * @param {class} load the class to load
		 * @param {object} data object to be passed to the requested activity / class
		 */
		public load_activity( load: any, data: object = {} ) {
			
			// run the class's destoryer
			if( this.activity != null ) {
				
				if( typeof this.activity.destory === 'function' ) this.activity.destory();
				delete this.activity;
			}
	
			window.setTimeout(this.finish_load_activity.bind(this, load, data), 50);
		}
	
		/**
		 * loads the activity after 50ms, this is to fix a bug related to activitys loading after they call the next one (???) on load
		 * 
		 * @param id 
		 * @param data 
		 */
		public finish_load_activity( id: any, data: object = {} ) {
	
			this.activity = new id( this, data );
			//console.log( 'loaded: '+id.toString() );
		}
	}

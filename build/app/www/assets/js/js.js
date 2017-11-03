var activity_launch = /** @class */ (function () {
    function activity_launch(core) {
        this.core = core;
        this.core.template.load('launch');
        console.log('testing');
    }
    activity_launch.prototype.destory = function () { };
    return activity_launch;
}());

/**
 * the main system, holds all other classes
 */
var core = /** @class */ (function () {
    /**
     *
     */
    //user:user;
    function core() {
        /**
         * holds the active activity
         */
        this.activity = null;
        /**
         * holds the data class
         */
        this.data = new data();
        /**
         * holds the network API
         */
        //network:network = new network();
        /**
         * holds the view class
         */
        this.template = new template(this);
        document.addEventListener('deviceready', this.init.bind(this), false);
        this.init();
    }
    /**
     * things that are needed when the game lunches
     */
    core.prototype.init = function () {
        this.load_activity(activity_launch, {});
    };
    /**
     * runs the requested activity, or assigns a class (i.g story or tut) to the activity holder
     *
     * @param {class} load the class to load
     * @param {object} data object to be passed to the requested activity / class
     */
    core.prototype.load_activity = function (load, data) {
        if (data === void 0) { data = {}; }
        // run the class's destoryer
        if (this.activity != null) {
            if (typeof this.activity.destory === 'function')
                this.activity.destory();
            delete this.activity;
        }
        window.setTimeout(this.finish_load_activity.bind(this, load, data), 50);
    };
    /**
     * loads the activity after 50ms, this is to fix a bug related to activitys loading after they call the next one (???) on load
     *
     * @param id
     * @param data
     */
    core.prototype.finish_load_activity = function (id, data) {
        if (data === void 0) { data = {}; }
        this.activity = new id(this, data);
        //console.log( 'loaded: '+id.toString() );
    };
    return core;
}());

/**
 *
 */
var data = /** @class */ (function () {
    function data() {
    }
    data.prototype.get = function (field) {
        return window.localStorage.getItem(field);
    };
    data.prototype.set = function (field, value) {
        return window.localStorage.setItem(field, value);
    };
    data.prototype.from_file = function (field, file) {
        var request = $.ajax({
            url: file,
            method: 'GET'
        });
        request.done(function (data) {
            this.set(field, data);
        });
        request.fail(function (jqXHR, textStatus) {
            this.set(field, false);
        });
    };
    data.prototype.json = function (file, callback) {
        var request = $.ajax({
            dataType: "json",
            url: file
        });
        request.done(function (json) {
            console.log(json);
            if (typeof callback === 'function')
                callback(json);
        });
        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
        console.log('loaded: ' + file);
    };
    return data;
}());

var template = /** @class */ (function () {
    function template(core) {
    }
    /**
    * gets view requested by activity
    *
    * @param string id  - name of the view to be called
    * @param string ele - name of the div to be shown
    */
    template.prototype.load = function (id, ele) {
        if (ele === void 0) { ele = null; }
        var request = $.ajax({
            url: 'assets/templates/' + id + '.html',
            method: 'GET'
        });
        request.done(function (html) {
            //$('#'+( ele == null ? 'blocks > #main-block > #page > #content' : ele ) ).html(html);
            this.raw = html;
            this.renderer = Handlebars.compile(this.raw);
            $('#' + (ele == null ? 'block' : ele)).html(this.renderer({ test: 'testing' }));
        });
        request.fail(function (jqXHR, textStatus) {
            alert('Failed loading activity');
        });
    };
    return template;
}());

new core();

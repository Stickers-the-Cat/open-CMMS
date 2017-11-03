'use strict';

const gulp = require('gulp'); // https://www.npmjs.com/package/gulp
const concat = require('gulp-concat'); // https://www.npmjs.com/package/gulp-concat
const minify = require('gulp-minify'); // https://www.npmjs.com/package/gulp-minify
const ts = require('gulp-typescript'); // https://www.npmjs.com/package/gulp-typescript
const sass = require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
const merge = require('merge2') // https://www.npmjs.com/package/merge2

let locations = {

	scripts: [
		'./src/typescript/activities/**/*.ts',
		'./src/typescript/engine/**/*.ts',
		'./src/typescript/declare.ts'
	], scss: [
		'./src/sass/**/*.scss'
	], js: [
		'./src/assets/js/**/*.js'
	], index: [
		'./src/index.html'
	], template: [
		'./src/templates/**/*'
	]
}


gulp.task('build_ts', function () {

	gulp.src(locations.scripts)
	.pipe(ts({
		noImplicitAny: true,
		target: 'ES5',
	}))
	.pipe(concat('js.js'))
	.pipe(minify())
	.pipe(gulp.dest('../build/public/assets/js'))
});

gulp.task('build_scss', function () {

	gulp.src(locations.scss)
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('../build/public/assets/css'));
});


gulp.task('copy_js', function() {
	
		gulp.src(locations.js)
		.pipe(gulp.dest('../build/public/assets/js'));
	});

gulp.task('copy_index', function() {

	gulp.src(locations.index)
	.pipe(gulp.dest('../build/public/'));
});

gulp.task('copy_templates', function() {

	gulp.src(locations.template)
	.pipe(gulp.dest('../build/public/assets/templates/'));
});

/** 
 * this is for my localhost due to chrome debugging not working
 */
gulp.task('copy_to_wamp', function(){

	gulp.src('../build/public/**/*')
	.pipe(gulp.dest('C:\\wamp64\\www\\open-cmms'));
});

gulp.task('default', ['build_ts', 'build_scss', 'copy_js', 'copy_index', 'copy_templates', 'copy_to_wamp']);

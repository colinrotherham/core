/*
	Dependencies
	----------------------------------- */

	// Gulp + plugins
	var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')();

	// Non-gulp modules
	plugins.path = require('path');
	plugins.browserSync = require('browser-sync'),
	plugins.runSequence = require('run-sequence');
	plugins.eventStream = require('event-stream');

	// Fetch config
	var config = require('./package.json').config;


/*
	Child tasks
	----------------------------------- */

	plugins.getModule = function(task) {
		return require(plugins.path.resolve(config.paths.tasks, task))(config.paths, gulp, plugins);
	}

	gulp.task('clean', plugins.getModule('clean'));
	gulp.task('copy', plugins.getModule('copy'));
	gulp.task('css', plugins.getModule('css/bundle'));
	gulp.task('javascript-lint', plugins.getModule('javascript/lint'));
	gulp.task('javascript', plugins.getModule('javascript/bundle'));
	gulp.task('html', plugins.getModule('html/html'));
	gulp.task('image-fallbacks', plugins.getModule('images/fallbacks'));
	gulp.task('image-optimise', plugins.getModule('images/optimise'));
	gulp.task('watch', plugins.getModule('watch'));
	gulp.task('browser-sync', plugins.getModule('browser-sync'));


/*
	Main tasks
	----------------------------------- */

	// Shared build tasks
	gulp.task('build', ['clean'], function(callback) {
		plugins.runSequence('javascript-lint', ['css', 'javascript'], ['image-fallbacks', 'html'], callback);
	});

	// Default tasks
	gulp.task('default', ['clean'], function(callback) {
		plugins.runSequence('build', 'copy', callback);
	});

	// Development tasks
	gulp.task('dev', ['clean'], function(callback) {
		plugins.runSequence('build', 'copy', ['watch', 'browser-sync'], callback);
	});

	// Live tasks
	gulp.task('live', ['default'], function(callback) {
		gulp.start('image-optimise', callback);
	});

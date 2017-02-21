/**
 * Dependencies
 */

// Gulp, plugins, config
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./package.json').config;

// Non-gulp modules
plugins.path = require('path');
plugins.browserSync = require('browser-sync');
plugins.runSequence = require('run-sequence');
plugins.eventStream = require('event-stream');

/**
 * Child tasks
 */

plugins.getModule = function (task) {
	return require(plugins.path.resolve(config.paths.tasks, task))(config.paths, gulp, plugins);
};

gulp.task('clean', plugins.getModule('clean'));
gulp.task('copy', plugins.getModule('copy'));
gulp.task('css-lint', plugins.getModule('css/lint'));
gulp.task('css', plugins.getModule('css/bundle'));
gulp.task('javascript-lint', plugins.getModule('javascript/lint'));
gulp.task('javascript', plugins.getModule('javascript'));
gulp.task('html', plugins.getModule('html/html'));
gulp.task('html-lint', plugins.getModule('html/lint'));
gulp.task('image-fallbacks', plugins.getModule('images/fallbacks'));
gulp.task('image-optimise', plugins.getModule('images/optimise'));
gulp.task('watch', plugins.getModule('watch'));
gulp.task('browser-sync', plugins.getModule('browser-sync'));

/**
 * Main tasks
 */

// Shared build tasks
gulp.task('build', ['clean'], function (callback) {
	plugins.runSequence(['css-lint', 'css'], ['javascript-lint', 'javascript'], ['image-fallbacks', 'html'], callback);
});

// Default tasks
gulp.task('default', ['clean'], function (callback) {
	plugins.runSequence('build', 'copy', callback);
});

// Development tasks
gulp.task('dev', ['clean'], function (callback) {
	plugins.runSequence('build', 'copy', ['watch', 'browser-sync'], callback);
});

// Live tasks
gulp.task('live', ['default'], function (callback) {
	gulp.start('image-optimise', callback);
});

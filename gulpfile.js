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
plugins.eventStream = require('event-stream');
plugins.sequence = require('run-sequence');

/**
 * Child tasks
 */

function getModule (task) {
	return require(`${config.paths.tasks}/${task}`)(config.paths, gulp, plugins);
}

gulp.task('clean', getModule('clean'));
gulp.task('copy', getModule('copy'));
gulp.task('css-lint', getModule('css/lint'));
gulp.task('css', getModule('css'));
gulp.task('javascript-lint', getModule('javascript/lint'));
gulp.task('javascript', getModule('javascript'));
gulp.task('html-lint', getModule('html/lint'));
gulp.task('html', getModule('html'));
gulp.task('image-fallbacks', getModule('images/fallbacks'));
gulp.task('image-optimise', getModule('images/optimise'));
gulp.task('watch', getModule('watch'));
gulp.task('browser-sync', getModule('browser-sync'));

/**
 * Main tasks
 */

// Shared build tasks
gulp.task('build', ['clean'], function (callback) {
	plugins.sequence(['css-lint', 'css'], ['javascript-lint', 'javascript'], ['image-fallbacks', 'html'], 'html-lint', callback);
});

// Default tasks
gulp.task('default', ['clean'], function (callback) {
	plugins.sequence('build', 'copy', callback);
});

// Development tasks
gulp.task('dev', ['clean'], function (callback) {
	plugins.sequence('build', 'copy', ['watch', 'browser-sync'], callback);
});

// Live tasks
gulp.task('live', ['default'], function (callback) {
	gulp.start('image-optimise', callback);
});

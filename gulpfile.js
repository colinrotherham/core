/**
 * Dependencies
 */

require('source-map-support/register');
require('@babel/register');

const task = require('./src/tasks');
const config = require('./src/config.json');
const gulp = require('gulp');
const sequence = require('run-sequence');

/**
 * Child tasks
 */

gulp.task('clean', task.clean(config.clean));
gulp.task('copy', task.copy(config.copy, gulp));
gulp.task('js:babel', task.js.babel(config.js.babel, gulp));
gulp.task('lint:js', task.lint.js(config.lint.js, gulp));

/**
 * Main tasks
 */

// Shared build tasks
gulp.task('build', done => {
	sequence('lint:js', 'js:babel', done);
});

// Default tasks
gulp.task('default', ['clean'], done => {
	sequence('copy', 'build', done);
});

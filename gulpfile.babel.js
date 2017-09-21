/**
 * Dependencies
 */

import 'source-map-support/register';
import * as task from './src/tasks';
import config from './src/config.json';
import gulp from 'gulp';
import sequence from 'run-sequence';

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

/**
 * Dependencies
 */

require('source-map-support/register');
require('@babel/register');

const task = require('./src/tasks');
const config = require('./src/config.json');
const gulp = require('gulp');

/**
 * Child tasks
 */

gulp.task('clean', task.clean(config.clean));
gulp.task('copy', task.copy(config.copy, gulp));
gulp.task('js:babel', task.js.babel(config.js.babel, gulp));
gulp.task('lint:js', task.lint.js(config.lint.js, gulp));
gulp.task('watch', task.watch(config, gulp));

/**
 * Main tasks
 */

// Shared build tasks
gulp.task(
  'build',
  gulp.series(
    'lint:js',
    'js:babel',
  ),
);

// Default tasks
gulp.task(
  'default',
  gulp.series(
    'clean',
    'copy',
    'build',
  ),
);

// Development tasks
gulp.task(
  'dev',
  gulp.series(
    'default',
    'watch',
  ),
);

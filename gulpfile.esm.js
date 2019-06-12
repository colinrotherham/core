import * as task from './src/tasks/index.mjs';
import config from './src/config.json';
import gulp from 'gulp';

/**
 * Child tasks
 */
gulp.task('clean', task.clean(config.clean));
gulp.task('copy', task.copy(config.copy, gulp));
gulp.task('js:babel', task.js.babel(config.js.babel, gulp));
gulp.task('watch', task.watch(config, gulp));
gulp.task('html:nunjucks', task.html.nunjucks(config.html.nunjucks, gulp));

/**
 * Main tasks
 */

// Shared build tasks
gulp.task(
  'build',
  gulp.series(
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

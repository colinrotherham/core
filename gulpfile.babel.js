/**
 * Dependencies
 */

import 'source-map-support/register';
import * as task from './tasks';
import config from './tasks/config.json';
import gulp from 'gulp';
import sequence from 'run-sequence';

/**
 * Child tasks
 */

gulp.task('clean', task.clean(config));
gulp.task('copy', task.copy(config, gulp));
gulp.task('css', task.css(config, gulp));
gulp.task('html', task.html(config, gulp));
gulp.task('img:optimise', task.img.optimise(config, gulp));
gulp.task('img:fallbacks', task.img.fallbacks(config, gulp));
gulp.task('js', task.js(config, gulp));
gulp.task('lint:a11y', task.lint.a11y(config, gulp));
gulp.task('lint:css', task.lint.css(config, gulp));
gulp.task('lint:html', task.lint.html(config, gulp));
gulp.task('lint:js', task.lint.js(config, gulp));
gulp.task('serve', task.serve(config));
gulp.task('watch', task.watch(config));

/**
 * Main tasks
 */

// Shared code compile task
gulp.task('compile', done => {
	sequence(['lint:js', 'lint:css'], ['js', 'css'], done);
});

// Shared build tasks
gulp.task('build', done => {
	sequence(['compile', 'img:fallbacks'], ['html', 'img:optimise'], ['lint:html', 'lint:a11y'], done);
});

// Default tasks
gulp.task('default', ['clean'], done => {
	sequence('copy', 'build', done);
});

// Development tasks
gulp.task('dev', ['clean'], done => {
	sequence('default', ['watch', 'serve'], done);
});

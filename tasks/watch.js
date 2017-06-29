/**
 * Watch
 */

import batch from 'gulp-batch';
import runSequence from 'run-sequence';
import watch from 'gulp-watch';

// Return module
export default (config, gulp) => {
	const sequence = runSequence.use(gulp);

	return () => {

		// Watch for static asset changes
		watch(`${config.paths.src}/**/*`, batch((events, done) => {
			return sequence('copy', done);
		}));

		// Watch for CSS changes
		watch(`${config.paths.srcAssets}/**/*.scss`, batch((events, done) => {
			return sequence('lint:css', 'css', done);
		}));

		// Watch for JS changes
		watch(`${config.paths.srcAssets}/**/*.js`, batch((events, done) => {
			return sequence('lint:js', 'js', done);
		}));

		// Watch for HTML changes
		watch([`${config.paths.src}/templates/**/*.hbs`, `${config.paths.buildAssets}/css/critical.min.css`], batch((events, done) => {
			return sequence('html', ['lint:html', 'lint:a11y'], done);
		}));

		// Watch for SVG changes
		watch(`${config.paths.srcAssets}/img/**/*.svg`, batch((events, done) => {
			return sequence('img:fallbacks', 'img:optimise', done);
		}));
	};
};

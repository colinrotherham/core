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
		watch(config.copy.watch, batch((events, done) => {
			return sequence('copy', done);
		}));

		// Watch for CSS changes
		watch(config.css.watch, batch((events, done) => {
			return sequence('lint:css', 'css', done);
		}));

		// Watch for JS changes
		watch(config.js.babel.watch, batch((events, done) => {
			return sequence('lint:js', 'js:babel', done);
		}));

		// Watch for HTML changes
		watch(config.html.watch, batch((events, done) => {
			return sequence('html', done);
		}));

		// Watch for SVG changes
		watch(config.img.fallbacks.watch, batch((events, done) => {
			return sequence('img:fallbacks', 'img:optimise', done);
		}));
	};
};

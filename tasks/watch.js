/**
 * Watch
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function () {

		// Watch for CSS changes
		plugins.watch(`${paths.src}/**/*.scss`, plugins.batch(function (events, done) {
			return plugins.sequence('css-lint', 'css', done);
		}));

		// Watch for JS changes
		plugins.watch(`${paths.src}/**/*.js`, plugins.batch(function (events, done) {
			return plugins.sequence('js-lint', 'js', done);
		}));

		// Watch for HTML changes
		plugins.watch([
			`${paths.src}/templates/**/*.hbs`,
			`${paths.build}/assets/css/starter.min.css`
		], plugins.batch(function (events, done) {
			return plugins.sequence('html', 'html-lint', done);
		}));

		// Watch for SVG changes
		plugins.watch(`${paths.src}/public/assets/img/**/*.svg`, plugins.batch(function (events, done) {
			return plugins.sequence('img-fallbacks', 'img', done);
		}));

		// Watch for static asset changes
		plugins.watch(`${paths.src}/public/**`, plugins.batch(function (events, done) {
			return plugins.sequence('copy', done);
		}));
	};
};

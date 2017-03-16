/**
 * Watch
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function () {

		// Watch for static asset changes
		plugins.watch(`${paths.src}/**/*`, plugins.batch(function (events, done) {
			return plugins.sequence('copy', done);
		}));

		// Watch for CSS changes
		plugins.watch(`${paths.srcAssets}/**/*.scss`, plugins.batch(function (events, done) {
			return plugins.sequence('css-lint', 'css', done);
		}));

		// Watch for JS changes
		plugins.watch(`${paths.srcAssets}/**/*.js`, plugins.batch(function (events, done) {
			return plugins.sequence('js-lint', 'js', done);
		}));

		// Watch for HTML changes
		plugins.watch([
			`${paths.src}/templates/**/*.hbs`,
			`${paths.buildAssets}/css/critical.min.css`
		], plugins.batch(function (events, done) {
			return plugins.sequence('html', ['html-lint', 'html-a11y'], done);
		}));

		// Watch for SVG changes
		plugins.watch(`${paths.srcAssets}/img/**/*.svg`, plugins.batch(function (events, done) {
			return plugins.sequence('img-fallbacks', 'img', done);
		}));
	};
};

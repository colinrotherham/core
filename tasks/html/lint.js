/**
 * Lint HTML for errors etc
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function (callback) {
		return gulp.src(`${paths.build}/*.html`)
			.pipe(plugins.htmlhint())
			.pipe(plugins.htmlhint.reporter('htmlhint-stylish'));
	};
};

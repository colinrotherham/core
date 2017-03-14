/**
 * Lint JS for errors etc
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function (callback) {

		// Load all JavaScript files
		return gulp.src(`${paths.srcAssets}/**/*.js`)
			.pipe(plugins.eslint())
			.pipe(plugins.eslint.format());
	};
};

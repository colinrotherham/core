/**
 * Generate PNG fallbacks for SVGs
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function () {
		return gulp.src(`${paths.srcAssets}/img/**/*.svg`)
			.pipe(plugins.svg2png())
			.pipe(gulp.dest(`${paths.buildAssets}/img`))
			.pipe(plugins.browserSync.stream());
	};
};

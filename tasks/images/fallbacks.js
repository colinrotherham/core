/**
 * Generate PNG fallbacks for SVGs
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function () {
		return gulp.src(`${paths.src}/public/assets/img/**/*.svg`)
			.pipe(plugins.svg2png())
			.pipe(gulp.dest(`${paths.build}/assets/img`))
			.pipe(plugins.browserSync.stream());
	};
};

/**
 * Generate PNG fallbacks for SVGs
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function () {

		return gulp.src(plugins.path.resolve(paths.src, '**/*.{svg}'))
			.pipe(plugins.svg2png())
			.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/img')))
			.pipe(plugins.browserSync.reload({ stream: true }));
	};
};

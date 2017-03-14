/**
 * Copy
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function (callback) {

		// Paths to copy
		var pathsCopy = [

			// Copy all files
			`${paths.src}/**`,

			// Except for templates
			`!${paths.src}/templates`,
			`!${paths.src}/templates/**`
		];

		return gulp.src(pathsCopy, { dot: true })
			.pipe(plugins.newer(paths.build))
			.pipe(gulp.dest(paths.build))
			.pipe(plugins.preservetime());
	};
};

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

			// Skip templates
			`!${paths.src}/templates`,
			`!${paths.src}/templates/**`,

			// Skip assets
			`!${paths.src}/assets`,
			`!${paths.src}/assets/**`
		];

		return plugins.stream.merge(

			gulp.src(pathsCopy, { dot: true })
				.pipe(plugins.newer(paths.build))
				.pipe(gulp.dest(paths.build))
				.pipe(plugins.preservetime()),

			gulp.src(`${paths.srcAssets}/**`, { dot: true })
				.pipe(plugins.newer(paths.build))
				.pipe(gulp.dest(paths.buildAssets))
				.pipe(plugins.preservetime())
		);
	};
};

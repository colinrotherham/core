/**
 * Optimise images
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Child modules
	var pngquant = require('imagemin-pngquant');
	var mozjpeg = require('imagemin-mozjpeg');

	// Return module
	return function () {

		// Override plugins (default + pngquant, mozjpeg)
		var use = [
			plugins.imagemin.gifsicle(),
			plugins.imagemin.svgo(),
			pngquant(),
			mozjpeg({
				quality: 70,
				progressive: true
			})
		];

		// Additional options
		var options = {
			progressive: true
		};

		return gulp.src(plugins.path.resolve(paths.build, '**/*.{png,jpg,gif,svg}'))
			.pipe(plugins.imagemin(options))
			.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/img')));
	};
};

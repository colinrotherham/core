/**
 * Optimise images
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Child modules
	var pngquant = require('imagemin-pngquant');
	var mozjpeg = require('imagemin-mozjpeg');

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

	// Return module
	return function () {
		return gulp.src(`${paths.build}/assets/img/**/*.{png,jpg,gif,svg}`)
			.pipe(plugins.imagemin(use))
			.pipe(gulp.dest(`${paths.build}/assets/img`));
	};
};

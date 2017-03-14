/**
 * Output optimised images
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Override plugin settings
	var use = [
		plugins.imagemin.gifsicle(),
		plugins.imagemin.jpegtran({
			progressive: true
		}),
		plugins.imagemin.optipng(),
		plugins.imagemin.svgo({
			plugins: [{
				removeViewBox: false
			}]
		})
	];

	// Return module
	return function () {
		return gulp.src(`${paths.buildAssets}/img/**/*.{png,jpg,gif,svg}`)
			.pipe(plugins.imagemin(use))
			.pipe(gulp.dest(`${paths.buildAssets}/img`));
	};
};

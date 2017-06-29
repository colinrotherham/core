/**
 * Output optimised images
 */

import imagemin from 'gulp-imagemin';

// Return module
export default (config, gulp) => {

	const options = [
		imagemin.gifsicle(),
		imagemin.jpegtran({
			progressive: true
		}),
		imagemin.optipng(),
		imagemin.svgo({
			plugins: [{
				removeViewBox: false
			}]
		})
	];

	return () => gulp.src(`${config.paths.buildAssets}/img/**/*.{png,jpg,gif,svg}`)
		.pipe(imagemin(options))
		.pipe(gulp.dest(`${config.paths.buildAssets}/img`));
};

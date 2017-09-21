/**
 * Output optimised images
 */

import imagemin from 'gulp-imagemin';

// Return module
export default (config, gulp) => {

	const options = config.options || [
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

	return () => gulp.src(config.src, { dot: true })
		.pipe(imagemin(options))
		.pipe(gulp.dest(config.dest));
};

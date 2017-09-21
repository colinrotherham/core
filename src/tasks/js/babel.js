/**
 * JavaScript (server-side)
 */

import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

// Return module
export default (config, gulp) => {

	return () => gulp.src(config.src, { dot: true })

		// Start sourcemaps
		.pipe(sourcemaps.init())

		// Process JavaScript
		.pipe(babel(config.options || { presets: ['env'] }))

		// Write to files
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.dest));
};

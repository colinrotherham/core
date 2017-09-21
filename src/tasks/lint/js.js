/**
 * Lint JS for errors etc
 */

import eslint from 'gulp-eslint';

// Return module
export default (config, gulp) => {

	// Return module
	return () => gulp.src(config.src, { dot: true })
		.pipe(eslint())
		.pipe(eslint.format());
};

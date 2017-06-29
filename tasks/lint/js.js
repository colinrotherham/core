/**
 * Lint JS for errors etc
 */

import eslint from 'gulp-eslint';

// Return module
export default (config, gulp) => {

	// Return module
	return () => gulp.src([
		`${config.paths.srcAssets}/**/*.{js,json}`,
		`${config.paths.src}/../tasks/**/*.{js,json}`
	])
		.pipe(eslint())
		.pipe(eslint.format());
};

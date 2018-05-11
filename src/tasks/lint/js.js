import eslint from 'gulp-eslint';

/**
 * Lint JS for errors etc
 */
export default (config, gulp) => {

	// Return module
	return () => gulp.src(config.src, { dot: true })
		.pipe(eslint())
		.pipe(eslint.format());
};

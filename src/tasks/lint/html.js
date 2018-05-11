import htmlhint from 'gulp-htmlhint';

/**
 * Lint HTML for errors etc
 */
export default (config, gulp) => {

	// Return module
	return () => gulp.src(config.src, { dot: true })
		.pipe(htmlhint())
		.pipe(htmlhint.reporter('htmlhint-stylish'));
};

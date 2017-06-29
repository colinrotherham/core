/**
 * Lint HTML for errors etc
 */

import htmlhint from 'gulp-htmlhint';

// Return module
export default (config, gulp) => {

	// Return module
	return () => gulp.src(`${config.paths.build}/*.html`)
		.pipe(htmlhint())
		.pipe(htmlhint.reporter('htmlhint-stylish'));
};

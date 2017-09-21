/**
 * Generate PNG fallbacks for SVGs
 */

import browserSync from 'browser-sync';
import svg2png from 'gulp-svg2png';

// Return module
export default (config, gulp) => {

	return () => gulp.src(config.src, { dot: true })
		.pipe(svg2png())
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.stream());
};

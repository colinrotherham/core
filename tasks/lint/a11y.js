/**
 * Accessibility test HTML
 */

import accessibility from 'gulp-accessibility';

// Return module
export default (config, gulp) => {

	const options = {
		accessibilityLevel: 'WCAG2AA',
		force: true,
		reportLevels: {
			notice: false,
			warning: false,
			error: true
		}
	};

	// Return module
	return () => gulp.src(`${config.paths.build}/*.html`)
		.pipe(accessibility(options))
		.on('error', console.log);
};

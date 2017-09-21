/**
 * Accessibility test HTML
 */

import accessibility from 'gulp-accessibility';

// Return module
export default (config, gulp) => {

	const options = config.options || {
		accessibilityLevel: 'WCAG2AA',
		force: true,
		reportLevels: {
			notice: false,
			warning: false,
			error: true
		}
	};

	// Return module
	return () => gulp.src(config.src, { dot: true })
		.pipe(accessibility(options))
		.on('error', console.log);
};

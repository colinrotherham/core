import accessibility from 'gulp-accessibility';

/**
 * Accessibility test HTML
 */
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

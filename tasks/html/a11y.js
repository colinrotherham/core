/**
 * Accessibility test HTML
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	var options = {
		accessibilityLevel: 'WCAG2AA',
		force: true,
		reportLevels: {
			notice: false,
			warning: false,
			error: true
		}
	};

	// Return module
	return function (callback) {
		return gulp.src(`${paths.build}/*.html`)
			.pipe(plugins.accessibility(options))
			.on('error', console.log);
	};
};

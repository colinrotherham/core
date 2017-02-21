/**
 * Lint Sass for errors etc
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	var options = {
		failAfterError: false,
		reporters: [
			{
				formatter: 'string',
				console: true
			}
		]
	};

	// Return module
	return function (callback) {

		// Load all Sass files
		return gulp.src(`${paths.src}/**/*.scss`)
			.pipe(plugins.stylelint(options));
	};
};

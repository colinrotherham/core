/*
	Lint JavaScript for errors etc
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Get base JavaScript config
		var settings = plugins.getModule('javascript/config');

		// Return module
		return function(callback) {

			// Load all JavaScript files
			return gulp.src(settings.modules)
				.pipe(plugins.jscs())
		};
	};

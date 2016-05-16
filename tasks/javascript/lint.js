/*
	Lint JavaScript for errors etc
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Get base JavaScript config
		var config = plugins.getModule('javascript/config');

		// Return module
		return function(callback) {

			// Load all JavaScript files
			return gulp.src(config.modules)
				.pipe(plugins.jscs())
		};
	};

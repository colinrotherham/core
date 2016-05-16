/*
	Lint JavaScript for errors etc
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {

			// Load all JavaScript files
			return gulp.src(plugins.path.resolve(paths.src, '**/*.js'))
				.pipe(plugins.jscs())
		};
	};

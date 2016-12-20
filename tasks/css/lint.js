/*
	Lint Sass for errors etc
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {

			var options = {
				failAfterError: false,
				reporters: [
					{
						formatter: 'string',
						console: true
					}
				]
			}

			// Load all Sass files
			return gulp.src(plugins.path.resolve(paths.src, '**/*.scss'))
				.pipe(plugins.stylelint(options))
		};
	};

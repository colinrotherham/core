/*
	JavaScript Libraries
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var browserify = require('browserify'),
			buffer = require('vinyl-buffer'),
			source = require('vinyl-source-stream');

		// Configure
		var b = browserify({
			debug: true
		});

		// Return module
		return function() {

			// Get base JavaScript config
			var settings = plugins.getModule('javascript/config'),
				utilities = settings.dependencies;

			// Mark all library includes as external
			for (var utility in utilities) {
				b.require(utilities[utility], { expose: utility });
			}

			return b.bundle()
				.pipe(plugins.plumber())

				// Load files
				.pipe(source(plugins.path.resolve(paths.src, 'public/assets/js/src/main.js')))
				.pipe(buffer())

				// Uglify and switch to build location
				.pipe(plugins.uglify())
				.pipe(plugins.concat('main-libs.min.js'))

				// Start sourcemaps, uglify and switch to build location
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.uglify())
				.pipe(plugins.concat('main-libs.min.js'))

				// Write to files
				.pipe(plugins.sourcemaps.write('.'))
				.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/js')))

				// Filter out sourcemaps, reload in browser
				.pipe(plugins.filter('**/*.js'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

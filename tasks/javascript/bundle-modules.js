/*
	JavaScript Modules
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var browserify = require('browserify'),
			buffer = require('vinyl-buffer'),
			source = require('vinyl-source-stream');

		// Get base JavaScript config
		var settings = plugins.getModule('javascript/config'),
			utilities = settings.dependencies;

		// Default settings
		settings.browserify = {
			alias: [],
			debug: true,
			external: [],
			entries: plugins.path.resolve(paths.src, 'public/assets/js/src/main.js'),
			paths: [
				plugins.path.resolve(paths.src, 'public/assets/js/src/')
			]
		};

		// Mark all library includes as external
		for (var utility in utilities) {
			settings.browserify.alias.push(utilities[utility] + ':' + utility);
			settings.browserify.external.push(utilities[utility]);
		}

		// Configure
		var b = browserify(settings.browserify);

		// Mark all library includes as external
		for (var utility in utilities) {
			b.external(utility);
		}

		// Return module
		return function() {

			return b.bundle()
				.pipe(plugins.plumber())

				// Load files
				.pipe(source(plugins.path.resolve(paths.src, 'public/assets/js/src/main.js')))
				.pipe(buffer())

				// Start sourcemaps, uglify and switch to build location
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.uglify())
				.pipe(plugins.concat('main.min.js'))

				// Write to files
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/assets/js/src/partials' }))
				.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/js')))

				// Filter out sourcemaps, reload in browser
				.pipe(plugins.filter('**/*.js'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

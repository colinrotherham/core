/*
	JavaScript Modules
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var browserify = require('browserify'),
			buffer = require('vinyl-buffer'),
			source = require('vinyl-source-stream');

		// Get base JavaScript config
		var config = plugins.getModule('javascript/config');

		// Default Browserify options
		var options = {
			debug: true,
			external: [],
			paths: [
				plugins.path.resolve(paths.src, 'public/assets/js/src/')
			]
		};

		// Create bundle
		function bundle(name, entry, overrides) {

			// Allow overrides
			var excludeModules = !!(overrides && overrides.excludeModules),
				excludeDependences = !!(overrides && overrides.excludeDependences);

			// Optional dependencies to exclude
			var dependencies = config[name].dependencies;

			// Optional module entry point
			if (!excludeModules)
				options.entries = entry;

			// Configure
			var b = browserify(options);

			if (dependencies.length) {

				// Mark all dependencies as external
				if (excludeDependences) {
					for (var dependency in dependencies) {
						b.external(dependencies[dependency]);
					}
				}

				// Otherwise, force require all
				for (var dependency in dependencies) {
					b.require(dependencies[dependency], { expose: dependencies[dependency] });
				}
			}

			return b.bundle()
				.pipe(plugins.plumber())

				// Load files
				.pipe(source(entry))
				.pipe(buffer())

				// Start sourcemaps, uglify and switch to build location
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.uglify())
				.pipe(plugins.concat((excludeModules? name + '-libs' :  name) + '.min.js'))

				// Write to files
				.pipe(plugins.sourcemaps.write('.'))
				.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/js')))

				// Filter out sourcemaps, reload in browser
				.pipe(plugins.filter('**/*.js'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		}

		// Prepare libs & modules split bundles
		function processBundle(name, entry) {
			var splits = [];

			// Split bundle (i.e. Libraries & Modules)
			if (config[name].dependencies && config[name].dependencies.length) {
				splits.push(bundle(name, entry, { excludeModules: true }));
				splits.push(bundle(name, entry, { excludeDependences: true }));
			}

			// Single bundle
			else splits.push(bundle(name, entry));

			// Return merged
			return plugins.eventStream.merge(splits);
		}

		// Return module
		return function() {

			// Loop bundles
			var bundles = [];
			for (var bundle in config) {
				bundles.push(processBundle(bundle, plugins.path.resolve(paths.src, 'public/assets/js/src/', bundle + '.js')));
			}

			// Return merged
			return plugins.eventStream.merge(bundles);
		};
	};

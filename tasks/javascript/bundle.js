/**
 * JavaScript modules
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Child modules
	var browserify = require('browserify');
	var buffer = require('vinyl-buffer');
	var source = require('vinyl-source-stream');

	// Get base JavaScript config etc
	var config = plugins.getModule('javascript/config');

	var isDebug = false;

	var options = {

		browserify: {
			debug: true,
			external: [],
			paths: [
				plugins.path.resolve(paths.src, 'public/assets/js/')
			]
		},

		uglify: {
			compress: { screw_ie8: false },
			mangle: { screw_ie8: false },
			output: { screw_ie8: false }
		}
	};

	// Create bundle
	function bundle (name, entry, overrides) {

		// Allow overrides
		var excludeModules = !!(overrides && overrides.excludeModules);
		var excludeDependences = !!(overrides && overrides.excludeDependences);

		// Optional dependencies to exclude
		var dependencies = config[name].dependencies;

		// Optional module entry point
		if (!excludeModules) {
			options.browserify.entries = entry;
		}

		// Configure
		var b = browserify(options.browserify);

		if (dependencies.length) {

			// Mark all dependencies as external
			if (excludeDependences) {
				for (let dependency in dependencies) {
					b.external(dependencies[dependency]);
				}
			}

			// Otherwise, force require all
			for (let dependency in dependencies) {
				b.require(dependencies[dependency], { expose: dependencies[dependency] });
			}
		}

		return b.bundle()
			.pipe(plugins.plumber())

			// Load files
			.pipe(source(entry))
			.pipe(buffer())

			// Start sourcemaps
			.pipe(plugins.sourcemaps.init({
				loadMaps: true,
				base: 'app/public'
			}))

			// Uglify and switch to build location
			.pipe(plugins.if(!isDebug, plugins.uglify(options.uglify)))
			.pipe(plugins.concat((excludeModules ? name + '-libs' : name) + '.min.js'))

			// Write to source maps
			.pipe(plugins.sourcemaps.write('.', {
				includeContent: false,
				mapSources: function(sourcePath) {
					sourcePath = sourcePath.replace('app/public/assets/js', '');
					sourcePath = sourcePath.replace('/app/public', '');
					return sourcePath;
				},
				sourceMappingURLPrefix: '/assets/js',
			}))

			// Write to files
			.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/js')))

			// Filter out sourcemaps, reload in browser
			.pipe(plugins.filter('**/*.js'))
			.pipe(plugins.browserSync.reload({ stream: true }));
	}

	// Prepare libs & modules split bundles
	function processBundle (name, entry) {
		var splits = [];

		// Split bundle (i.e. Libraries & Modules)
		if (config[name].dependencies && config[name].dependencies.length) {
			splits.push(bundle(name, entry, { excludeModules: true }));
			splits.push(bundle(name, entry, { excludeDependences: true }));
		}

		// Single bundle
		else {
			splits.push(bundle(name, entry));
		}

		// Return merged
		return plugins.eventStream.merge(splits);
	}

	// Return module
	return function () {
		isDebug = !!(this.tasks.dev && this.tasks.dev.running);

		// Loop bundles
		var bundles = [];
		for (var bundle in config) {
			bundles.push(processBundle(bundle, plugins.path.resolve(paths.src, 'public/assets/js/', bundle + '.js')));
		}

		// Return merged
		return plugins.eventStream.merge(bundles);
	};
};

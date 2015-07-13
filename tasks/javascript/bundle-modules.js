/*
	JavaScript Modules
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var amdOptimize = require('amd-optimize'),
			util = require('util');

		// Return module
		return function() {

			// Get base JavaScript config
			var settings = plugins.getModule('javascript/config'),
				dependencies = util._extend(settings.dependencies.utilities, settings.dependencies.modules);

			// AMD settings
			settings.AMD = {
				basePath: '/assets/js/src/partials',
				configFile: plugins.path.join(paths.assets.js, 'src/config.js'),
				exclude: [],
				findNestedDependencies: true,
				paths: {}
			};

			// Exclude all library paths etc
			for (var dependency in dependencies) {
				settings.AMD.paths[dependency] = dependencies[dependency];
				settings.AMD.exclude.push(dependency);
			}

			// Merge two glob streams
			return plugins.eventStream.merge(

				// Prepend config file
				gulp.src(settings.AMD.configFile),

				// RequireJS modules
				gulp.src(settings.modules)
					.pipe(plugins.sourcemaps.init())
					.pipe(plugins.jscs())
					.pipe(amdOptimize('main', settings.AMD))
					.pipe(plugins.sourcemaps.write()))

				.pipe(plugins.sourcemaps.init({ loadMaps: true }))

				// Uglify and combine
				.pipe(plugins.uglify())
				.pipe(plugins.concat('main.min.js'))

				// Write to files
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/assets/js/src/partials' }))
				.pipe(gulp.dest(plugins.path.join(paths.build, 'assets/js')))

				// Filter out sourcemaps, reload in browser
				.pipe(plugins.filter('**/*.js'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

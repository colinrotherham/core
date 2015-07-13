/*
	JavaScript Libraries
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules etc
		var settings = plugins.getModule('javascript/config');

		// Prepare [un]wrapped stream
		function uglifyStream(glob, params) {

			var stream = gulp.src(glob, { base: process.cwd() })
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.uglify())

			// Name AMD ModuleID as file basename
			if (params && params.wrap) {

				stream.pipe(plugins.rename({ base: '', dirname: '/temp' }))
					.pipe(plugins.wrapAmd({ moduleRoot: 'temp/' }))
					.pipe(plugins.uglify());
			}

			return stream;
		}

		return function() {

			var dependencies = {
				utilities: [],
				modules: []
			};

			// Build utilities glob from AMD paths
			for (var dependency in settings.dependencies.utilities) {
				dependencies.utilities.push(settings.dependencies.utilities[dependency] + '.js');
			}

			// Build modules glob from AMD paths
			for (var dependency in settings.dependencies.modules) {
				dependencies.modules.push(settings.dependencies.modules[dependency] + '.js');
			}

			// Merge two glob streams
			plugins.eventStream.merge(
				uglifyStream(dependencies.utilities, { wrap: false }),
				uglifyStream(dependencies.modules, { wrap: true }))

				// Write to files
				.pipe(plugins.concat('main-libs.min.js'))
				.pipe(plugins.sourcemaps.write('.'))
				.pipe(gulp.dest(plugins.path.join(paths.build, 'assets/js')))

				// Filter out sourcemaps, reload in browser
				.pipe(plugins.filter('**/*.js'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

/*
	CSS
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var autoprefixer = require('autoprefixer'),
			csswring = require('csswring'),
			mqpacker = require('css-mqpacker');

		var isDebug;

		// Prepare bundle
		function processBundle(name, glob, options) {

			// PostCSS tasks
			var cssTasks = [
				autoprefixer(options.autoprefixer)
			];

			// Skip tasks only in dev mode
			if (!isDebug) {
				cssTasks.push(csswring(options.csswring));
				cssTasks.push(mqpacker(options.mqpacker));
			}

			return gulp.src(glob)

				// Process Sass
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))

				// Process PostCSS
				.pipe(plugins.postcss(cssTasks))

				// Rename, write to files
				.pipe(plugins.concat(name + '.min.css'))
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/assets/scss/' }))
				.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/css')))

				// Reload in browser
				.pipe(plugins.filter('**/*.css'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		}

		// Return module
		return function() {
			isDebug = !!(this.tasks.dev && this.tasks.dev.running);

			// Get base CSS config
			var config = plugins.getModule('css/config');

			// Module options
			var options = {

				autoprefixer: {
					browsers: ['> 2%', 'IE >= 8', 'iOS >= 7'],
					cascade: false,
					map: true,
					remove: true
				},

				csswring: {
					removeAllComments: true
				},

				mqpacker: {
					sort: true
				},

				sass: {
					errLogToConsole: true,
					includePaths: [
						'node_modules'
					],
					outputStyle: 'compressed'
				}
			};

			// Process bundles
			var bundles = [];
			for (var bundle in config) {
				bundles.push(processBundle(bundle, config[bundle], options));
			}

			// Return merged
			return plugins.eventStream.merge(bundles);
		};
	};

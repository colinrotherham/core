/*
	CSS
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var autoprefixer = require('autoprefixer'),
			csswring = require('csswring'),
			eyeglass = require('eyeglass'),
			mqpacker = require('css-mqpacker');

		// Prepare bundle
		function processBundle(name, glob, options) {

			return gulp.src(glob)

				// Process Sass
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.sass(eyeglass(options.sass, plugins.sass)).on('error', plugins.sass.logError))

				// Process PostCSS
				.pipe(plugins.postcss([
					autoprefixer(options.autoprefixer),
					csswring(options.csswring),
					mqpacker
				]))

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
					eyeglass: {
						enableImportOnce: true
					},
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

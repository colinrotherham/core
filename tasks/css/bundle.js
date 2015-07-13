/*
	CSS
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var autoprefixer = require('autoprefixer-core'),
			csswring = require('csswring'),
			mqpacker = require('css-mqpacker');

		// Prepare bundle
		function processBundle(name, glob, options) {

			return gulp.src(glob)

				// Process Sass
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))

				// Process PostCSS
				.pipe(plugins.postcss([
					autoprefixer(options.autoprefixer),
					csswring(options.csswring),
					mqpacker
				]))

				// Rename, write to files
				.pipe(plugins.concat(name + '.min.css'))
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/assets/scss/' }))
				.pipe(gulp.dest(plugins.path.join(paths.build, 'assets/css')))

				// Reload in browser
				.pipe(plugins.filter('**/*.css'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		}

		// Return module
		return function() {

			// Get base CSS config
			var settings = plugins.getModule('css/config');

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

				sass: {
					errLogToConsole: true,
					style: 'compressed',

					importer: function(uri, prev, done) {
						done(plugins.sass.compiler.types.NULL);
					}
				}
			};

			// Set up eyeglass
			var eyeglass = require('eyeglass')(options.sass);
			eyeglass.enableImportOnce = false;

			// Update Sass options
			options.sass = eyeglass.sassOptions();

			// Process each bundle
			return plugins.eventStream.merge(
				processBundle('starter', settings.starter.dependencies.concat(settings.starter.partials), options),
				processBundle('main', settings.main.dependencies.concat(settings.main.partials), options),
				processBundle('legacy', settings.legacy.dependencies.concat(settings.legacy.partials), options)
			);
		};
	};

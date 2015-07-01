/*
	CSS
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var autoprefixer = require('autoprefixer-core'),
			csswring = require('csswring'),
			mqpacker = require('css-mqpacker');

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

			return gulp.src(settings.dependencies.concat(settings.partials))

				// Process Sass
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.sass(eyeglass.sassOptions()).on('error', plugins.sass.logError))

				// Process PostCSS
				.pipe(plugins.postcss([
					autoprefixer(options.autoprefixer),
					csswring, mqpacker
				]))

				// Rename, write to files
				.pipe(plugins.concat('main.min.css'))
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/assets/scss/' }))
				.pipe(gulp.dest(plugins.path.join(paths.build, 'assets/css')))

				// Reload in browser
				.pipe(plugins.filter('**/*.css'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};
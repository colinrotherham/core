/*
	CSS
	----------------------------------- */

	module.exports = function (paths, gulp, plugins) {

		// Child modules
		var autoprefixer = require('autoprefixer-core'),
			mqpacker = require('css-mqpacker'),
			csswring = require('csswring');

		// Return module
		return function() {

			var settings = {

				autoprefixer: {
					browsers: ['> 2%', 'IE >= 8', 'iOS >= 7'],
					cascade: false,
					map: true,
					remove: true
				},

				sass: {
					errLogToConsole: true,
					style: 'compressed'
				}
			};

			return gulp.src(plugins.path.join(paths.assets.css, '*.scss'))

				// Process Sass
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.sass(settings.sass))

				// Process PostCSS
				.pipe(plugins.postcss([
					autoprefixer(settings.autoprefixer),
					csswring, mqpacker
				]))

				// Rename, write to files
				.pipe(plugins.rename({ suffix: '.min' }))
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/assets/scss/' }))
				.pipe(gulp.dest(plugins.path.join(paths.build, 'assets/css')))

				// Reload in browser
				.pipe(plugins.filter('**/*.css'))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};
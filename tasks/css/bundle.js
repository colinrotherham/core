/**
 * CSS
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Child modules
	var autoprefixer = require('autoprefixer');
	var csswring = require('csswring');
	var mqpacker = require('css-mqpacker');

	var isDebug = false;

	// Prepare bundle
	function processBundle (name, glob, options) {

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

			// Start sourcemaps
			.pipe(plugins.sourcemaps.init({
				loadMaps: true,
				base: 'app/public'
			}))

			// Process Sass
			.pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))

			// Process PostCSS, rename
			.pipe(plugins.postcss(cssTasks))
			.pipe(plugins.rename(name + '.min.css'))

			// Write to source maps
			.pipe(plugins.sourcemaps.write('.', {
				includeContent: false,
				sourceMappingURLPrefix: '/assets/css',
				sourceRoot: '/assets/scss/'
			}))

			// Write to files
			.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/css')))

			// Reload in browser
			.pipe(plugins.filter('**/*.css'))
			.pipe(plugins.browserSync.reload({ stream: true }));
	}

	// Return module
	return function () {
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

/**
 * CSS
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	var autoprefixer = require('autoprefixer');
	var csswring = require('csswring');
	var mqpacker = require('css-mqpacker');

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
			style: 'expanded',
			includePaths: [
				'node_modules'
			]
		}
	};

	// Return module
	return function () {
		return gulp.src(require('./config')(paths))

			// Start sourcemaps
			.pipe(plugins.sourcemaps.init())

			// Process Sass
			.pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))

			// Process PostCSS
			.pipe(plugins.postcss([
				autoprefixer(options.autoprefixer),
				csswring(options.csswring),
				mqpacker(options.mqpacker)
			]))

			// Rename
			.pipe(plugins.rename({
				extname: '.min.css'
			}))

			// Write to files
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(gulp.dest(`${paths.build}/assets/css`))

			// Reload in browser
			.pipe(plugins.filter('**/*.css'))
			.pipe(plugins.browserSync.stream());
	};
};

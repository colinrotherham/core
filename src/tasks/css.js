/**
 * CSS
 */

import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import csswring from 'csswring';
import mqpacker from 'css-mqpacker';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

// Return module
export default (config, gulp) => {

	// Module options
	const options = config.options || {

		autoprefixer: {
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

	return () => gulp.src(config.src, { dot: true })

		// Start sourcemaps
		.pipe(sourcemaps.init())

		// Process Sass
		.pipe(sass(options.sass).on('error', sass.logError))

		// Process PostCSS
		.pipe(postcss([
			autoprefixer(options.autoprefixer),
			csswring(options.csswring),
			mqpacker(options.mqpacker)
		]))

		// Rename
		.pipe(rename({
			extname: '.min.css'
		}))

		// Write to files
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.dest))

		// Reload in browser
		.pipe(browserSync.stream({ match: '**/*.css' }));
};

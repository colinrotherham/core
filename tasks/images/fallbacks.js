/*
	Generate PNG fallbacks for SVGs
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function() {

			return gulp.src(plugins.path.join(paths.assets.images, '{,**/}*.svg'))
				.pipe(plugins.svg2png())
				.pipe(gulp.dest(plugins.path.join(paths.build, 'assets/img')))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

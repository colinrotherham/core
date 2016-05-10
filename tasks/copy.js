/*
	Copy
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {
			return gulp.src(plugins.path.join(paths.src, 'public/**'), { dot: true })
				.pipe(plugins.newer(paths.build))
				.pipe(gulp.dest(paths.build))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

/*
	Copy
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {
			return gulp.src(plugins.path.resolve(paths.src, 'public/**'), { dot: true })
				.pipe(plugins.newer(paths.build))
				.pipe(gulp.dest(paths.build))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

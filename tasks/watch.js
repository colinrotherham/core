/*
	Watch
	----------------------------------- */

	module.exports = function (paths, gulp, plugins) {

		// Return module
		return function() {

			var pathCSS = plugins.path.join(paths.assets.css, '{,*/}*.scss'),
				pathJS = plugins.path.join(paths.assets.js, 'src/{,*/}*.js'),
				pathFonts = plugins.path.join(paths.assets.fonts, '**'),
				pathImages = plugins.path.join(paths.assets.images, '**'),
				pathHTML = plugins.path.join(paths.html, '{,*/}*.hbs');

			// Watch for CSS changes
			plugins.watch(pathCSS, function() {
				gulp.start('css');
			});

			// Watch for JS changes
			plugins.watch(pathJS, function() {
				gulp.start('bundle-modules');
			});

			// Watch for HTML changes
			plugins.watch(pathHTML, function() {
				gulp.start('html');
			});

			// Watch for static asset changes
			plugins.watch([pathFonts, pathImages], function() {
				gulp.start('copy');
			});
		};
	};
/*
	Watch
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function() {

			// Source paths
			var pathCSS = plugins.path.join(paths.assets.css, '{,**/}*.scss'),
				pathJS = plugins.path.join(paths.assets.js, 'src/{,**/}*.js'),
				pathFonts = plugins.path.join(paths.assets.fonts, '**'),
				pathImages = plugins.path.join(paths.assets.images, '**'),
				pathSVG = plugins.path.join(paths.assets.images, '{,**/}*.svg'),
				pathHTML = plugins.path.join(paths.html, '{,**/}*.hbs');

			// Critical build paths (e.g. rebuild HTML when critical styles change)
			var pathCriticalCSS = plugins.path.join(paths.build, 'assets/css/starter.min.css');

			// Watch for CSS changes
			plugins.watch(pathCSS, function() {
				gulp.start('bundle-css');
			});

			// Watch for JS changes
			plugins.watch(pathJS, function() {
				gulp.start('bundle-modules');
			});

			// Watch for HTML changes
			plugins.watch([pathHTML, pathCriticalCSS], function() {
				gulp.start('html');
			});

			// Watch for SVG changes
			plugins.watch(pathSVG, function() {
				gulp.start('image-fallbacks');
			});

			// Watch for static asset changes
			plugins.watch([pathFonts, pathImages], function() {
				gulp.start('copy');
			});
		};
	};

/*
	Watch
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function() {

			// Source paths
			var pathCSS = plugins.path.resolve(paths.src, '**/*.scss'),
				pathJS = plugins.path.resolve(paths.src, '**/*.js'),
				pathFonts = plugins.path.resolve(paths.src, '**/fonts/**'),
				pathImages = plugins.path.resolve(paths.src, '**/*.{png,jpg,gif}'),
				pathSVG = plugins.path.resolve(paths.src, '**/*.{svg}'),
				pathHTML = plugins.path.resolve(paths.src, '**/*.hbs');

			// Critical build paths (e.g. rebuild HTML when critical styles change)
			var pathCriticalCSS = plugins.path.resolve(paths.build, 'assets/css/starter.min.css');

			// Watch for CSS changes
			plugins.watch(pathCSS, plugins.batch(function (events, done) {
				return plugins.runSequence('bundle-css', done);
			}));

			// Watch for JS changes
			plugins.watch(pathJS, plugins.batch(function (events, done) {
				return plugins.runSequence('lint-modules', 'bundle-modules', done);
			}));

			// Watch for HTML changes
			plugins.watch([pathHTML, pathCriticalCSS], plugins.batch(function (events, done) {
				return plugins.runSequence('html', done);
			}));

			// Watch for SVG changes
			plugins.watch(pathSVG, plugins.batch(function (events, done) {
				return plugins.runSequence('image-fallbacks', done);
			}));

			// Watch for static asset changes
			plugins.watch([pathFonts, pathImages], plugins.batch(function (events, done) {
				return plugins.runSequence('copy', done);
			}));
		};
	};

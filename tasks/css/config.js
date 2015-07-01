/*
	CSS Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return configuration
		return {

			// Sass partials
			partials: [
				plugins.path.join(paths.assets.css, '*.scss')
			],

			// Other dependencies (breakpoint, normalize etc)
			dependencies: [
				plugins.path.join(paths.modules, 'breakpoint-sass/stylesheets/*.scss'),
				plugins.path.join(paths.modules, 'normalize.css/normalize.css')
			],
		};
	};
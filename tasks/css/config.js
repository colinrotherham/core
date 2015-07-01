/*
	CSS Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return bundles
		return {

			// Starter style bundle
			starter: {

				// Sass partials
				partials: [
					plugins.path.join(paths.assets.css, 'starter.scss'),
				],

				// Other dependencies
				dependencies: [
					plugins.path.join(paths.modules, 'normalize.css/normalize.css'),
				]
			},

			// Main style bundle
			main: {

				// Sass partials
				partials: [
					plugins.path.join(paths.assets.css, 'main.scss'),
				],

				// Other dependencies
				dependencies: [
					plugins.path.join(paths.modules, 'breakpoint-sass/stylesheets/*.scss'),
				]
			}
		};
	};
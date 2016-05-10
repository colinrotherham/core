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
					plugins.path.resolve(paths.src, 'public/assets/scss/starter.scss'),
				]
			},

			// Main style bundle
			main: {

				// Sass partials
				partials: [
					plugins.path.resolve(paths.src, 'public/assets/scss/main.scss'),
				]
			},

			// Legacy style bundle
			legacy: {

				// Sass partials
				partials: [
					plugins.path.resolve(paths.src, 'public/assets/scss/legacy.scss'),
				]
			}
		};
	};

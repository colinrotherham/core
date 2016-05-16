/*
	CSS Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return bundles
		return {

			// Starter style bundle
			starter: [
				plugins.path.resolve(paths.src, 'public/assets/scss/starter.scss')
			],

			// Main style bundle
			main: [
				plugins.path.resolve(paths.src, 'public/assets/scss/main.scss')
			],

			// Legacy style bundle
			legacy: [
				plugins.path.resolve(paths.src, 'public/assets/scss/legacy.scss')
			]
		};
	};

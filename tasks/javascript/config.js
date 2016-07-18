/*
	JavaScript Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return configuration
		return {

			// Main JS bundle (Modern browsers)
			main: {

				// External dependencies
				dependencies: [
					'jquery',
					'fg-loadjs',
					'fg-loadcss',
					'picturefill',
					'components-webfontloader'
				]
			},

			// Legacy JS bundle (IE8 and lower only)
			legacy: {

				// External dependencies
				dependencies: []
			}
		};
	};

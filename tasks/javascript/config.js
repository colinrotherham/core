/**
 * JavaScript config
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return configuration
	return {

		// Starter JS bundle (assists Critical CSS)
		starter: {

			// External dependencies
			dependencies: []
		},

		// Main JS bundle (Modern browsers)
		main: {

			// External dependencies
			dependencies: [
				'jquery',
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

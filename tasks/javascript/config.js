/**
 * JavaScript config
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return bundles
	return [

		// Starter JS bundle (assists Critical CSS)
		`${paths.src}/public/assets/js/starter.js`,

		// Main JS bundle (Modern browsers)
		`${paths.src}/public/assets/js/main.js`,

		// Legacy JS bundle (IE8 and lower only)
		`${paths.src}/public/assets/js/legacy.js`
	];
};

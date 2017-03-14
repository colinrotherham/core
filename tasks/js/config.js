/**
 * JavaScript config
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return bundles
	return [

		// Starter JS bundle (assists Critical CSS)
		`${paths.srcAssets}/js/starter.js`,

		// Main JS bundle (Modern browsers)
		`${paths.srcAssets}/js/main.js`,

		// Legacy JS bundle (IE8 and lower only)
		`${paths.srcAssets}/js/legacy.js`
	];
};

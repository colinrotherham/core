/**
 * JavaScript config
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return bundles
	return [

		// Critical JS bundle (assists inline CSS)
		`${paths.srcAssets}/js/critical.js`,

		// Main JS bundle (Modern browsers)
		`${paths.srcAssets}/js/main.js`,

		// Legacy JS bundle (IE8 and lower only)
		`${paths.srcAssets}/js/legacy.js`
	];
};

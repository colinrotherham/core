/**
 * CSS config
 */

'use strict';

module.exports = function (paths) {

	// Return bundles
	return [

		// Starter style bundle (Critical CSS)
		`${paths.srcAssets}/scss/starter.scss`,

		// Main style bundle (Modern browsers)
		`${paths.srcAssets}/scss/main.scss`,

		// Legacy style bundle (IE8 and lower)
		`${paths.srcAssets}/scss/legacy.scss`
	];
};

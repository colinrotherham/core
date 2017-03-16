/**
 * CSS config
 */

'use strict';

module.exports = function (paths) {

	// Return bundles
	return [

		// Critical style bundle (inline CSS)
		`${paths.srcAssets}/scss/critical.scss`,

		// Main style bundle (Modern browsers)
		`${paths.srcAssets}/scss/main.scss`,

		// Legacy style bundle (IE8 and lower)
		`${paths.srcAssets}/scss/legacy.scss`
	];
};

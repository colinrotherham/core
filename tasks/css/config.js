/**
 * CSS config
 */

'use strict';

module.exports = function (paths) {

	// Return bundles
	return [

		// Starter style bundle (Critical CSS)
		`${paths.src}/public/assets/scss/starter.scss`,

		// Main style bundle (Modern browsers)
		`${paths.src}/public/assets/scss/main.scss`,

		// Legacy style bundle (IE8 and lower)
		`${paths.src}/public/assets/scss/legacy.scss`
	];
};

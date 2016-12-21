/**
 * CSS config
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return bundles
	return {

		// Starter style bundle (Critical CSS)
		starter: [
			plugins.path.resolve(paths.src, 'public/assets/scss/starter.scss')
		],

		// Main style bundle (Modern browsers)
		main: [
			plugins.path.resolve(paths.src, 'public/assets/scss/main.scss')
		],

		// Legacy style bundle (IE8 and lower)
		legacy: [
			plugins.path.resolve(paths.src, 'public/assets/scss/legacy.scss')
		]
	};
};

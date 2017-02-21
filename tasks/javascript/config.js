/**
 * JavaScript config
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return bundles
	return [

		// Starter JS bundle (assists Critical CSS)
		plugins.path.resolve(paths.src, 'public/assets/js/starter.js'),

		// Main JS bundle (Modern browsers)
		plugins.path.resolve(paths.src, 'public/assets/js/main.js'),

		// Legacy JS bundle (IE8 and lower only)
		plugins.path.resolve(paths.src, 'public/assets/js/legacy.js')
	];
};

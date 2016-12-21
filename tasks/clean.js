/**
 * Clean
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function (callback) {
		return require('del')(plugins.path.resolve(paths.build, '*'), callback);
	};
};

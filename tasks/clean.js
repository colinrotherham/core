/**
 * Clean
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function (callback) {
		return require('del')(paths.build, callback);
	};
};

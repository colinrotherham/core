/*
	Clean
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {
			return require('del')(plugins.path.join(paths.build, '*'), callback);
		};
	};

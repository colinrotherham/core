/**
 * Serve
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	var options = {
		notify: false,
		open: false,
		reloadDelay: 400,
		reloadDebounce: 100,
		server: {
			baseDir: paths.build
		}
	};

	// Return module
	return function () {
		return plugins.browserSync(options);
	};
};

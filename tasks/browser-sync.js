/**
 * BrowserSync
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return module
	return function () {

		var options = {
			browser: 'google chrome',
			notify: false,
			open: false,
			reloadDelay: 300,
			server: { baseDir: paths.build }
		};

		return plugins.browserSync(options);
	};
};

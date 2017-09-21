/**
 * Serve
 */

import browserSync from 'browser-sync';

// Return module
export default config => {

	const options = config.options || {
		notify: false,
		open: false,
		reloadDelay: 400,
		reloadThrottle: 100
	};

	options.server = options.server || {};
	options.server.baseDir = config.src;

	return () => browserSync(options);
};

/**
 * Serve
 */

import browserSync from 'browser-sync';

// Return module
export default config => {

	const options = {
		notify: false,
		open: false,
		reloadDelay: 400,
		reloadThrottle: 100,
		server: {
			baseDir: config.paths.build
		}
	};

	return () => browserSync(options);
};

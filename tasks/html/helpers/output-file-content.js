/**
 * File output (i.e. inlining content)
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Return helper
	return function (path) {
		var contents = '';

		try {
			contents = require('fs').readFileSync(path, 'utf8');
		}

		catch (err) {
			// No content
		}

		return contents.trim();
	};
};

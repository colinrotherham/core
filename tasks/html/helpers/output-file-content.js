/**
 * File output (i.e. inlining content)
 */

'use strict';

// Return helper
module.exports = function (path) {
	var contents = '';

	try {
		contents = require('fs').readFileSync(path, 'utf8');
	}

	catch (err) {
		// No content
	}

	return contents.trim();
};

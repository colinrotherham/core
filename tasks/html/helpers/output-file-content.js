/*
	File output (i.e. inlining content)
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return helper
		return function(path) {
			var contents = '';

			try {
				contents = require('fs').readFileSync(path, 'utf8');
			}

			catch(err) {}

			return contents;
		}
	};

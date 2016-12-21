/**
 * App launcher
 */

'use strict';

module.exports = function App () {
	var self = this;

	// Internal methods
	self.init = function () {

		// Other modules
		require('./example');
	};

	// Return instance
	return self;
};

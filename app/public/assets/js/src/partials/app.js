/**
 * App launcher
 */

'use strict';

module.exports = function App () {
	var self = this;

	// Dependencies
	require('fg-loadcss');
	require('fg-loadjs');

	// Internal methods
	self.init = function () {

		// Other modules
		require('partials/example');
	};

	// Return instance
	return self;
};

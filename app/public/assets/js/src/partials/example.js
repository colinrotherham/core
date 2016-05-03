/*
	Example module
	------------------------------- */

	module.exports = function() {
		'use strict';

		// Dependencies
		var $ = require('jQuery');

		// Test jQuery dependency
		if ($ && window.console)
			console.log('Hello, jQuery is ready');
	};

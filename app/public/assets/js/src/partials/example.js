/*
	Example module
	------------------------------- */

	module.exports = function() {
		'use strict';

		// Dependencies
		var $ = require('jquery');

		// Test jQuery dependency
		if ($ && window.console)
			console.log('Hello, jquery is ready');
	};

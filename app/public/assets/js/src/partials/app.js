/*
	App launcher
	------------------------------- */

	module.exports = function App() {
		'use strict';

		var self = this;

		// Dependencies
		var loadCSS = require('fg-loadcss'),
			loadJS = require('fg-loadjs');

/*
		External methods
		----------------------------------- */

		self.init = function() {

			// Other modules
			new (require('partials/example'))();
		};

		self.init();

		// Return instance
		return self;
	};

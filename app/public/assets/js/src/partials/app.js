/*
	App launcher
	------------------------------- */

	module.exports = function App() {
		'use strict';

		var self = this;

		// Dependencies
		var loadCSS = require('loadCSS'),
			onloadCSS = require('onloadCSS'),
			loadJS = require('loadJS');

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

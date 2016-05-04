/*
	HTML
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var assemble = require('assemble'),
			app = assemble();

		// Add helpers
		app.helper('outputFileContent', plugins.getModule('html/helpers/outputFileContent'));

		// Return module
		return function() {

			// Default page options
			var options = {
				name: 'default',
				locale: 'en-GB',

				// Appended to includes to bust cache
				timestamp: Date.now()
			};

			// Find layouts and partials
			app.layouts(plugins.path.join(paths.html, 'layouts/*.hbs'));
			app.partials(plugins.path.join(paths.html, 'partials/*.hbs'));

			// Add classic helpers
			app.helpers(require('handlebars-helpers')(), app.helpers);

			// Build templates
			return app.src(plugins.path.resolve(paths.html, '*.hbs'))
				.pipe(app.renderFile(options))
				.pipe(plugins.rename({ extname: '.html' }))
				.pipe(app.dest(paths.build))
				.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};

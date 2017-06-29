/**
 * HTML
 */

import assemble from 'assemble';
import browserSync from 'browser-sync';
import handlebarsHelpers from 'handlebars-helpers';
import outputFileContent from './helpers/output-file-content';
import rename from 'gulp-rename';

// Return module
export default (config, gulp) => {
	const app = assemble();

	// Add helpers
	app.helper('outputFileContent', outputFileContent);

	// Return module
	return () => {

		// Default page options
		const options = {
			name: 'default',
			locale: 'en-GB',

			// Appended to includes to bust cache
			timestamp: Date.now()
		};

		// Find layouts and partials
		app.layouts(`${config.paths.src}/templates/layouts/*.hbs`);
		app.partials(`${config.paths.src}/templates/partials/*.hbs`);

		// Add classic helpers
		app.helpers(handlebarsHelpers(), app.helpers);

		// Build templates
		return app.src(`${config.paths.src}/templates/*.hbs`)
			.pipe(app.renderFile(options))
			.pipe(rename({
				extname: '.html'
			}))
			.pipe(app.dest(config.paths.build))
			.pipe(browserSync.stream());
	};
};

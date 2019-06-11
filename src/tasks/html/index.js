import assemble from 'assemble';
import browserSync from 'browser-sync';
import handlebarsHelpers from 'handlebars-helpers';
import outputFileContent from './helpers/output-file-content';
import rename from 'gulp-rename';

/**
 * HTML
 */
export default (config, gulp) => {
  const app = assemble();

  // Add helpers
  app.helper('outputFileContent', outputFileContent);

  // Return module
  return () => {

    // Default page options
    const options = config.options || {
      name: 'default',
      locale: 'en-GB',

      // Appended to includes to bust cache
      timestamp: Date.now(),
    };

    // Find layouts and partials
    app.layouts(config.layouts);
    app.partials(config.partials);

    // Add classic helpers
    app.helpers(handlebarsHelpers(), app.helpers);

    // Build templates
    return app.src(config.src, { dot: true })
      .pipe(app.renderFile(options))
      .pipe(rename({
        extname: '.html',
      }))
      .pipe(app.dest(config.dest))
      .pipe(browserSync.stream());
  };
};

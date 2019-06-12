import { basename, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import browserSync from 'browser-sync';
import globals from './globals/index.mjs';
import nunjucks from 'nunjucks';
import rename from 'gulp-rename';
import tap from 'gulp-tap';
import yaml from 'js-yaml';

// Add template
const useTemplate = (env, file) => {
  const config = `${dirname(file.path)}/${basename(file.path).replace(/.njk$/, '.yaml')}`;

  // Default page options
  let context = {
    name: 'default',
    locale: 'en-GB',

    // Appended to includes to bust cache
    timestamp: Date.now(),
  };

  // Merge with context in YAML
  if (existsSync(config)) {
    context = { ...yaml.safeLoad(readFileSync(config, 'utf8')), ...context };
  }

  // Render to HTML
  file.contents = Buffer.from(
    env.renderString(file.contents.toString(), context),
  );
};

/**
 * Nunjucks static HTML generator
 */
export default (config, gulp) => {
  const options = config.options || {
    views: './src/views',
  };

  // Set up Nunjucks
  const env = nunjucks.configure(options.views);

  // Add globals
  for (const method in globals) {
    env.addGlobal(method, globals[method]);
  }

  // Return module
  return () => gulp.src(config.src, { dot: true })
    .pipe(tap(file => useTemplate(env, file)))
    .pipe(rename({
      extname: '.html',
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
};

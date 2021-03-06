import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import csso from 'postcss-csso';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

/**
 * CSS
 */
export default (config, gulp) => {

  // Module options
  const options = config.options || {

    autoprefixer: {
      cascade: false,
      map: true,
      remove: true,
    },

    csso: {
      comments: false,
    },

    sass: {
      style: 'expanded',
      includePaths: [
        'node_modules',
      ],
    },
  };

  return () => gulp.src(config.src, { dot: true })

    // Start sourcemaps
    .pipe(sourcemaps.init())

    // Process Sass
    .pipe(sass(options.sass).on('error', sass.logError))

    // Process PostCSS
    .pipe(postcss([
      autoprefixer(options.autoprefixer),
      csso(options.csso),
    ]))

    // Rename
    .pipe(rename({
      extname: '.min.css',
    }))

    // Write to files
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))

    // Reload in browser
    .pipe(browserSync.stream({ match: '**/*.css' }));
};

import browserSync from 'browser-sync';
import named from 'vinyl-named';
import stream from 'webpack-stream';
import webpack from 'webpack';

/**
 * JavaScript (client-side)
 */
export default (config, gulp) => {
  return () => gulp.src(config.src, { dot: true })
    .pipe(named())
    .pipe(stream(config.options, webpack))

    // Write to files
    .pipe(gulp.dest(config.dest))

    // Reload in browser
    .pipe(browserSync.stream({ match: '**/*.js' }));
};

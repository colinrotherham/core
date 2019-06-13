import babel from 'gulp-babel';
import revertPath from 'gulp-revert-path';
import sourcemaps from 'gulp-sourcemaps';

/**
 * JavaScript (server-side)
 */
export default (config, gulp) => {
  return () => gulp.src(config.src, { dot: true })

    // Start sourcemaps
    .pipe(sourcemaps.init())

    // Process JavaScript
    .pipe(babel(config.options || { presets: ['@babel/env'] }))
    .pipe(revertPath())

    // Write to files
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
};

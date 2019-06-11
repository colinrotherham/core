import stylelint from 'gulp-stylelint';

/**
 * Lint Sass for errors etc
 */
export default (config, gulp) => {

  const options = config.options || {
    failAfterError: false,
    reporters: [
      {
        formatter: 'string',
        console: true,
      },
    ],
  };

  // Return module
  return () => gulp.src(config.src, { dot: true })
    .pipe(stylelint(options));
};

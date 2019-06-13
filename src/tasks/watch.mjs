/**
 * Watch
 */
export default (config, gulp) => {
  return () => {
    const tasks = gulp.tree().nodes;

    // Watch for static asset changes
    if (config.copy &&
      tasks.includes('copy')) {

      gulp.watch(
        config.copy.watch || config.copy.src,
        gulp.series('copy'),
      );
    }

    // Watch for HTML changes
    if (config.html &&
      config.html.nunjucks &&
      tasks.includes('html:nunjucks')) {

      gulp.watch(
        config.html.nunjucks.watch || config.html.nunjucks.src,
        gulp.series('html:nunjucks'),
      );
    }

    // Watch for CSS changes
    if (config.css &&
      tasks.includes('css')) {

      gulp.watch(
        config.css.watch || config.css.src,
        gulp.series('css'),
      );
    }

    // Watch for JS babel changes
    if (config.js &&
      config.js.babel &&
      tasks.includes('js:babel')) {

      gulp.watch(
        config.js.babel.watch || config.js.babel.src,
        gulp.series('js:babel'),
      );
    }

    // Watch for JS webpack changes
    if (config.js &&
      config.js.webpack &&
      tasks.includes('js:webpack')) {

      gulp.watch(
        config.js.webpack.watch || config.js.webpack.src,
        gulp.series('js:webpack'),
      );
    }

    // Watch for images to optimise
    if (config.img &&
      config.img.optimise &&
      tasks.includes('img:optimise')) {

      gulp.watch(
        config.img.optimise.watch || config.img.optimise.src,
        gulp.series('img:optimise'),
      );
    }
  };
};

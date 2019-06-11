import browserSync from 'browser-sync';

/**
 * Serve
 */
export default config => {
  const options = config.options || {
    notify: false,
    open: false,
    reloadDelay: 400,
    reloadThrottle: 100,
    server: {
      baseDir: config.src,
    },
  };

  return () => browserSync(options);
};

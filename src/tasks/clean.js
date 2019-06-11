import del from 'del';

/**
 * Clean
 */
export default config => {
  return () => del(config.src, { dot: true });
};

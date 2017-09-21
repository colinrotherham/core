/**
 * Clean
 */

import del from 'del';

// Return module
export default config => {
	return () => del(config.src, { dot: true });
};

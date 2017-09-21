/**
 * Copy
 */

import changed from 'gulp-changed';
import preservetime from 'gulp-preservetime';

// Return module
export default (config, gulp) => {

	const options = config.options || {
		hasChanged: changed.compareContents
	};

	return () => gulp.src(config.src, { dot: true })
		.pipe(changed(config.dest, options))
		.pipe(gulp.dest(config.dest))
		.pipe(preservetime());
};

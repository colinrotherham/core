/**
 * Copy
 */

import changed from 'gulp-changed';
import preservetime from 'gulp-preservetime';
import stream from 'event-stream';

// Return module
export default (config, gulp) => {

	// Paths to copy
	const pathsCopy = [

		// Copy all files
		`${config.paths.src}/**/*.*`,

		// Skip templates
		`!${config.paths.src}/templates`,
		`!${config.paths.src}/templates/**`,

		// Skip assets
		`!${config.paths.src}/assets`,
		`!${config.paths.src}/assets/**`
	];

	const options = {
		hasChanged: changed.compareContents
	};

	return () => stream.merge(

		gulp.src(pathsCopy, { dot: true })
			.pipe(changed(config.paths.build, options))
			.pipe(gulp.dest(config.paths.build))
			.pipe(preservetime()),

		gulp.src(`${config.paths.srcAssets}/**`, { dot: true })
			.pipe(changed(config.paths.build, options))
			.pipe(gulp.dest(config.paths.buildAssets))
			.pipe(preservetime())
	);
};

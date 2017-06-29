/**
 * Lint Sass for errors etc
 */

import stylelint from 'gulp-stylelint';

// Return module
export default (config, gulp) => {

	const options = {
		failAfterError: false,
		reporters: [
			{
				formatter: 'string',
				console: true
			}
		]
	};

	// Return module
	return () => gulp.src(`${config.paths.srcAssets}/**/*.scss`)
		.pipe(stylelint(options));
};

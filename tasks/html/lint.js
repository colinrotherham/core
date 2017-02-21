/**
 * Lint HTML for errors etc
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	return function (callback) {
		return gulp.src(plugins.path.resolve(paths.build, '*.html'))
			.pipe(plugins.htmlhint())
			.pipe(plugins.htmlhint.reporter('htmlhint-stylish'));
	};
};

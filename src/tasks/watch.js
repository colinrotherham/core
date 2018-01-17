/**
 * Watch
 */

// Return module
export default (config, gulp) => {
	return () => {
		const tasks = gulp.tree().nodes;

		// Watch for static asset changes
		if (config.copy &&
			tasks.includes('copy')) {

			gulp.watch(
				config.copy.watch || config.copy.src,
				gulp.series('copy')
			);
		}

		// Watch for CSS changes
		if (config.css &&
			tasks.includes('lint:css') &&
			tasks.includes('css')) {

			gulp.watch(
				config.css.watch || config.css.src,
				gulp.series('lint:css', 'css')
			);
		}

		// Watch for JS changes
		if (config.js &&
			config.js.babel &&
			tasks.includes('lint:js') &&
			tasks.includes('js:babel')) {

			gulp.watch(
				config.js.babel.watch || config.js.babel.src,
				gulp.series('lint:js', 'js:babel')
			);
		}

		// Watch for HTML changes
		if (config.html &&
			tasks.includes('html')) {

			gulp.watch(
				config.html.watch || config.html.src,
				gulp.series('html')
			);
		}

		// Watch for SVG changes
		if (config.img &&
			config.img.fallbacks &&
			tasks.includes('img:fallbacks') &&
			tasks.includes('img:optimise')) {

			gulp.watch(
				config.img.fallbacks.watch || config.img.fallbacks.src,
				gulp.series('img:fallbacks', 'img:optimise')
			);
		}
	};
};

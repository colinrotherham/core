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
				gulp.series('copy')
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

		// Watch for CSS linting
		if (config.lint &&
			config.lint.css &&
			tasks.includes('lint:css')) {

			gulp.watch(
				config.lint.css.watch || config.lint.css.src,
				gulp.series('lint:css')
			);
		}

		// Watch for CSS changes
		if (config.css &&
			tasks.includes('css')) {

			gulp.watch(
				config.css.watch || config.css.src,
				gulp.series('css')
			);
		}

		// Watch for JS linting
		if (config.lint &&
			config.lint.js &&
			tasks.includes('lint:js')) {

			gulp.watch(
				config.lint.js.watch || config.lint.js.src,
				gulp.series('lint:js')
			);
		}

		// Watch for JS babel changes
		if (config.js &&
			config.js.babel &&
			tasks.includes('js:babel')) {

			gulp.watch(
				config.js.babel.watch || config.js.babel.src,
				gulp.series('js:babel')
			);
		}

		// Watch for JS webpack changes
		if (config.js &&
			config.js.webpack &&
			tasks.includes('js:webpack')) {

			gulp.watch(
				config.js.webpack.watch || config.js.webpack.src,
				gulp.series('js:webpack')
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

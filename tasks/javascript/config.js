/*
	JavaScript Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return configuration
		return {

			// AMD modules
			modules: [
				plugins.path.join(paths.assets.js, 'src/partials/*.js'),
				plugins.path.join(paths.assets.js, 'src/main.js')
			],

			// Non-AMD modules
			dependencies: {

				// Minify as-is
				utilities: {
					requirejs: plugins.path.join(paths.modules, 'requirejs/require'),
					picturefill: plugins.path.join(paths.modules, 'picturefill/dist/picturefill'),
					jquery: plugins.path.join(paths.modules, 'jquery/dist/jquery'),
					requestAnimationFrame: plugins.path.join(paths.modules, 'jquery.requestAnimationFrame/dist/jquery.requestAnimationFrame')
				},

				// Wrap as named AMD modules
				modules: {
					webfont: plugins.path.join(paths.modules, 'components-webfontloader/webfont'),
					loadJS: plugins.path.join(paths.modules, 'fg-loadjs/loadJS'),
					loadCSS: plugins.path.join(paths.modules, 'fg-loadcss/loadCSS'),
					onloadCSS: plugins.path.join(paths.modules, 'fg-loadcss/onloadCSS')
				}
			},
		};
	};

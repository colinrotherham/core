/*
	JavaScript Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return configuration
		return {

			// CommonJS modules
			modules: [
				plugins.path.join(paths.assets.js, 'src/partials/*.js'),
				plugins.path.join(paths.assets.js, 'src/main.js')
			],

			// External libraries etc
			dependencies: {
				jQuery: plugins.path.join(paths.modules, 'jquery/dist/jquery'),
				loadJS: plugins.path.join(paths.modules, 'fg-loadjs/loadJS'),
				loadCSS: plugins.path.join(paths.modules, 'fg-loadcss/src/loadCSS'),
				onloadCSS: plugins.path.join(paths.modules, 'fg-loadcss/src/onloadCSS'),
				picturefill: plugins.path.join(paths.modules, 'picturefill/dist/picturefill'),
				webfontloader: plugins.path.join(paths.modules, 'components-webfontloader/webfont')
			},
		};
	};

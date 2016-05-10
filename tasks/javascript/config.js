/*
	JavaScript Config
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return configuration
		return {

			// CommonJS modules
			modules: [
				plugins.path.join(paths.src, 'public/assets/js/src/partials/*.js'),
				plugins.path.join(paths.src, 'public/assets/js/src/main.js')
			],

			// External libraries etc
			dependencies: {
				jQuery: plugins.path.resolve('node_modules/jquery/dist/jquery'),
				loadJS: plugins.path.resolve('node_modules/fg-loadjs/loadJS'),
				loadCSS: plugins.path.resolve('node_modules/fg-loadcss/src/loadCSS'),
				onloadCSS: plugins.path.resolve('node_modules/fg-loadcss/src/onloadCSS'),
				picturefill: plugins.path.resolve('node_modules/picturefill/dist/picturefill'),
				webfontloader: plugins.path.resolve('node_modules/components-webfontloader/webfont')
			},
		};
	};

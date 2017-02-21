/**
 * JavaScript
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	// Child modules
	var stream = require('webpack-stream');
	var webpack = require('webpack');
	var named = require('vinyl-named');

	// Webpack options
	var options = {
		devtool: 'source-map',

		output: {
			chunkFilename: '[name]-[chunkhash].min.js',
			filename: '[name].min.js',
			publicPath: '/assets/js/'
		},

		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': 'production'
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'starter'
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					screw_ie8: false,
					warnings: false
				},
				mangle: {
					screw_ie8: false
				},
				output: {
					comments: false,
					screw_ie8: false
				},
				sourceMap: true
			})
		]
	};

	// Return module
	return function () {

		// Process entry point
		return gulp.src(plugins.getModule('javascript/config'))
			.pipe(named())
			.pipe(stream(options, webpack))

			// Write to files
			.pipe(gulp.dest(plugins.path.resolve(paths.build, 'assets/js')))

			// Reload in browser
			.pipe(plugins.filter('**/*.js'))
			.pipe(plugins.browserSync.stream());
	};
};

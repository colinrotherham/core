import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import config from './tasks/config.json';
import path from 'path';
import webpack from 'webpack';

// Use config for running process
const browserslist = require(path.resolve(process.cwd(), 'package.json')).browserslist;

// Return module
export default {
	devtool: 'source-map',

	module: {
		rules: [{
			test: /\.js$/,
			include: [
				path.resolve(`${config.paths.src}`),
				path.resolve(`${config.paths.srcAssets}`)
			],
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							loose: true,
							useBuiltIns: 'usage',
							targets: { browsers: browserslist }
						}]
					],
					plugins: [
						['transform-es2015-modules-commonjs', { loose: true }],
						'transform-es3-member-expression-literals',
						'transform-es3-property-literals'
					]
				}
			}]
		}]
	},

	output: {
		chunkFilename: '[name]-[chunkhash].min.js',
		filename: '[name].min.js',
		publicPath: '/assets/js/'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'critical'
		}),
		new UglifyJSPlugin({
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
	],

	resolve: {
		modules: [
			'node_modules',
			`${config.paths.srcAssets}/js`
		]
	}
};

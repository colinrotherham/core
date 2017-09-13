import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import config from './tasks/config.json';
import path from 'path';
import webpack from 'webpack';

// Use options for running process
const options = require(path.resolve(process.cwd(), '.babelrc.client.js'));

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
				options: options
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
			uglifyOptions: {
				compress: {
					ie8: true,
					warnings: false
				},
				mangle: {
					ie8: true
				},
				output: {
					comments: false,
					ie8: true
				},
				sourceMap: true
			}
		})
	],

	resolve: {
		modules: [
			'node_modules',
			`${config.paths.srcAssets}/js`
		]
	}
};

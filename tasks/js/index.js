/**
 * JavaScript
 */

import browserSync from 'browser-sync';
import named from 'vinyl-named';
import path from 'path';
import paths from './config';
import stream from 'webpack-stream';
import webpack from 'webpack';

// Use config for running process
const webpackConfig = require(path.resolve(process.cwd(), 'webpack.config.js')).default;

// Return module
export default (config, gulp) => {

	return () => gulp.src(paths(config))
		.pipe(named())
		.pipe(stream(webpackConfig, webpack))

		// Write to files
		.pipe(gulp.dest(`${config.paths.buildAssets}/js`))

		// Reload in browser
		.pipe(browserSync.stream({ match: '**/*.js' }));
};

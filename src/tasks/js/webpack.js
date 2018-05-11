import browserSync from 'browser-sync';
import fs from 'fs';
import named from 'vinyl-named';
import path from 'path';
import stream from 'webpack-stream';
import webpack from 'webpack';

// Use config for running process
let options = {};
const optionsPath = path.resolve(process.cwd(), 'webpack.config.js');

if (fs.existsSync(optionsPath)) {
	options = require(optionsPath).default;
}

/**
 * JavaScript (client-side)
 */
export default (config, gulp) => {

	return () => gulp.src(config.src, { dot: true })
		.pipe(named())
		.pipe(stream(options, webpack))

		// Write to files
		.pipe(gulp.dest(config.dest))

		// Reload in browser
		.pipe(browserSync.stream({ match: '**/*.js' }));
};

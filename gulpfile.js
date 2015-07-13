/*
	Dependencies
	----------------------------------- */

	// Gulp + plugins
	var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')();

	// Non-gulp modules
	plugins.path = require('path');
	plugins.browserSync = require('browser-sync'),
	plugins.runSequence = require('run-sequence');
	plugins.eventStream = require('event-stream');

	// Shared paths
	var paths = {

		// Build paths
		base: __dirname,
		build: plugins.path.join(__dirname, 'dist'),
		src: plugins.path.join(__dirname, 'app'),
		tasks: plugins.path.join(__dirname, 'tasks'),

		// Public assets
		assets: {
			css: plugins.path.join(__dirname, 'app/public/assets/scss'),
			js: plugins.path.join(__dirname, 'app/public/assets/js'),
			fonts: plugins.path.join(__dirname, 'app/public/assets/fonts'),
			images: plugins.path.join(__dirname, 'app/public/assets/img')
		},

		// HTML templates, node modules
		html: plugins.path.join(__dirname, 'app/templates'),
		modules: plugins.path.join(__dirname, 'node_modules')
	};


/*
	Child tasks
	----------------------------------- */

	plugins.getModule = function(task) {
		return require(plugins.path.join(paths.tasks, task))(paths, gulp, plugins);
	}

	gulp.task('bundle-css', plugins.getModule('css/bundle'));
	gulp.task('bundle-libs', plugins.getModule('javascript/bundle-libs'));
	gulp.task('bundle-modules', plugins.getModule('javascript/bundle-modules'));
	gulp.task('html', plugins.getModule('html/html'));
	gulp.task('image-fallbacks', plugins.getModule('images/fallbacks'));
	gulp.task('image-optimise', plugins.getModule('images/optimise'));
	gulp.task('watch', plugins.getModule('watch'));
	gulp.task('browser-sync', plugins.getModule('browser-sync'));


/*
	Utility tasks
	----------------------------------- */

	// Clean build directory
	gulp.task('clean', function(callback) {
		return require('del')(plugins.path.join(paths.build, '*'), callback);
	});

	// Copy into build directory
	gulp.task('copy', function() {
		return gulp.src(plugins.path.join(paths.src, 'public/**'), { dot: true })
			.pipe(plugins.newer(paths.build))
			.pipe(gulp.dest(paths.build))
			.pipe(plugins.browserSync.reload({ stream: true }));
	});


/*
	Main tasks
	----------------------------------- */

	// Shared build tasks
	gulp.task('build', ['clean'], function(callback) {
		plugins.runSequence(['bundle-css', 'bundle-libs', 'bundle-modules'], ['image-fallbacks', 'html'], callback);
	});

	// Default tasks
	gulp.task('default', ['clean'], function(callback) {
		plugins.runSequence('build', 'copy', callback);
	});

	// Development tasks
	gulp.task('dev', ['clean'], function(callback) {
		plugins.runSequence('build', 'copy', ['watch', 'browser-sync'], callback);
	});

	// Live tasks
	gulp.task('live', ['default'], function(callback) {
		gulp.start('image-optimise', callback);
	});

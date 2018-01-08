var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

// A single variable to hold all the paths
var paths = {
	'images' : ['./assets/images/**/*.*'],
	'styles' : ['./assets/scss/**/*.scss'],
};

// Compress images
gulp.task('images', function() {
	'use strict';
	return gulp.src(paths.images)
		.pipe(plugins.plumber())
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('dist/images'))
		.pipe(plugins.notify({
			'message' : 'Images compressed',
			'onLast'  : true
		}));
});

// Compile and minify SCSS files
gulp.task('styles', function() {
	'use strict';
	return gulp.src(paths.styles)
		.pipe(plugins.plumber())
		.pipe(plugins.sass({
			'includePaths' : require('node-normalize-scss').with('./assets/scss/style.scss')
		}))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(plugins.rename({
			'suffix' : '.min'
		}))
		.pipe(plugins.cssnano())
		.pipe(gulp.dest('./dist/css'))
		.pipe(plugins.notify({
			'message' : 'Styles updated',
			'onLast'  : true
		}));
});

// Live update these files
gulp.task('watch', function() {
	'use strict';
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.styles, ['styles']);
	plugins.livereload.listen();
	gulp.watch(['./dist/**/*']).on('change', plugins.livereload.changed);
});

gulp.task('default', [
	'images',
	'styles',
	'watch'
]);

var gulp = require('gulp');
var minify = require('gulp-minify');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');

// minify Js files
gulp.task('compress', function() {
	gulp.src('src/process-and-test.js')
		.pipe(minify({
			ext:{
				min:'.min.js'
				},
				exclude: ['tasks'],
				ignoreFiles: ['.combo.js', '-min.js'],
				noSource: true
				}))
		.pipe(gulp.dest('dist'))
	}
);

// run tests
gulp.task('test', () =>
    gulp.src('test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
);

// watch
gulp.task(
	'watch',
	function() {

		// Watch source .js files
		gulp.watch(
			'src/**/*.js',
			function() {
				runSequence('compress', 'test')
			}
		);

		// Watch test .js files
		gulp.watch(
			'test/**/*.js',
			function() {
				runSequence('compress', 'test')
			}
		)
	}
);

// default gulp task
gulp.task('default',
	function() {
		runSequence('compress', 'test', 'watch')
	}
);
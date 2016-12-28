var gulp = require('gulp');
var minify = require('gulp-minify');
var runSequence = require('run-sequence');

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
});

gulp.task(
	'watch',
	function() {

		// Watch .js files
		gulp.watch(
			'*.js',
			function() {
				runSequence('compress')
			}
		);
	}
);

// define tasks here
gulp.task('default',
	function() {
		runSequence('compress', 'watch')
	}
);
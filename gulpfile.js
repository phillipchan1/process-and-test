var gulp = require('gulp');
var minify = require('gulp-minify');
var mocha = require('gulp-mocha');

// minify Js files
gulp.task('compile', function() {
	gulp.src('src/index.js')
		.pipe(minify({
			ext:{
				min:'.js'
				},
				exclude: ['tasks'],
				ignoreFiles: ['.combo.js', '-min.js'],
				noSource: true
				}))
		.pipe(gulp.dest('./'))
	}
);

// run tests
gulp.task('test', () =>
    gulp.src('test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'spec'}))
);

// watch
gulp.task(
	'watch',
	function() {

		// Watch source .js files
		gulp.watch(
			'src/**/*.js',
			['compile', 'test']
		);

		// Watch test .js files
		gulp.watch(
			'test/**/*.js',
			['compile', 'test']
		)
	}
);

// default gulp task
gulp.task('default',
	['compile', 'test', 'watch']
);
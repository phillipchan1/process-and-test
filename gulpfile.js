// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minify = require('gulp-minify');

// Compile SASS
gulp.task('sass', function() {
    return sass('src/scss/*.scss', { style: 'compressed' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('scripts', function() {
    return gulp.src([
            'src/js/*'
        ])
        .pipe(concat('app.js'))
        .pipe(minify({
	        ext:{
	            min:'.min.js'
	        },
	        noSource: true
	    }))
        .pipe(gulp.dest('js'));
});

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest('js'))
});

// Watch for changes
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'watch']);
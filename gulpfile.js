// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minify = require('gulp-minify');
var markdown = require('gulp-markdown');

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

gulp.task('markdown', function () {
    return gulp.src('src/pages/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('src/pages/'));
});

// Watch for changes
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/scss/*.scss', ['sass']);
    // Watch .md files
    gulp.watch('src/pages/*.md', ['markdown']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'markdown', 'watch']);
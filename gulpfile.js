var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');

gulp.task('html', function() {
    return gulp.src('source/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('public'));
  });

gulp.task('minifyjs', function(){
    return gulp.src('source/js/libs/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('js', function(){
    return gulp.src('source/js/main.js')
    .pipe(minify())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('style', function () {
    return gulp.src('source/css/style.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('public/css'));
  });

gulp.task('serve', function () {
    browserSync.init({
        browser: 'google chrome', 
		open: true,
		port: 3000,
		logPrefix : 'Juliana Assalti',
		notify: true,
        server: {
            baseDir: "public"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch("source/js/*.js", ['js'])
    gulp.watch("source/css/style.css", ['style'])
    browserSync.stream();
    // gulp.watch("source/*.html").on('change', browserSync.reload)
});

gulp.task('default', [ 'html', 'minifyjs', 'js','style', 'serve', 'watch' ]);
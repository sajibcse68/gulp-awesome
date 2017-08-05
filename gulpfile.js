var gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify')
  del = require('del'),
  runSequence = require('run-sequence');


gulp.task('style', function () {
  return gulp
    .src('css/style.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  return gulp
    .src('js/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  del('dist', function (err) {
    console.log('Dist deleted!');
    console.log('err: ', err);
  });
});

gulp.task('watch', function () {
  gulp.watch('css/style.css', ['style']);
  gulp.watch('js/script.js', ['js']);
});

gulp.task('default', function (done) {
  runSequence('clean', ['style', 'js', 'watch'], function (error) {
    return done(error && error.err);
  });
});
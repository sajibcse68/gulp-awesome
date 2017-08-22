var gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  runSequence = require('run-sequence'),
  plubmer = require('gulp-plumber'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  merge = require('merge-stream')
  rev = require('gulp-rev');

var paths = {
  css: {
    files: ['css/**/*.css'],
    baseDir: 'css',
    destDir: 'dist'
  },
  css_ext: {
    files: [
      'node_modules/bootstrap/dist/css/bootstrap.css'
    ]
  }
};



gulp.task('style', function () {
  var cssStream = gulp
    .src(paths.css.files)
    .pipe(concat('css-files.css'));

  var cssExtStream = gulp
    .src(paths.css_ext.files)
    .pipe(concat('css-ext-files.css'));

  return merge(cssStream, cssExtStream)
    .pipe(concat('style.min.css'))
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest(paths.css.destDir))
    .pipe(rev.manifest({
      base: 'build-css',
      merge: true
    }))
    .pipe(gulp.dest('build-css'));
});

gulp.task('js', function () {
  return gulp
    .src('js/script.js')
    .pipe(plubmer())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest({
      base: 'build-js',
      merge: 'true'
    }))
    .pipe(gulp.dest('build-js'));
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
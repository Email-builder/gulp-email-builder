var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var emailBuilder = require('./lib/emailBuilder');

gulp.task('clean', function () {
  return gulp.src('examples/dist/*.html', {read: false})
    .pipe(clean());
});

gulp.task('emailBuilder', function() {
  return gulp.src(['./example/html/*.html'])
    .pipe(emailBuilder())
    .pipe(gulp.dest('./example/dist/'));
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['clean', 'lint', 'emailBuilder']);

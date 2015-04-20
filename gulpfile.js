var gulp = require('gulp');
var jshint = require('gulp-jshint');
var emailBuilder = require('./lib/emailBuilder');

gulp.task('emailBuilder', function() {
  return gulp.src(['./test/*.js'])
    .pipe(emailBuilder());
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', function() {
  // place code for your default task here
});

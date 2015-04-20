var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodeunit = require('gulp-nodeunit');
var emailBuilder = require('./lib/emailBuilder');

gulp.task('clean', function (cb) {
  del([
    './example/dist',
  ], cb);
});

gulp.task('emailBuilder', function() {
  return gulp.src(['./example/html/*.html'])
    .pipe(emailBuilder())
    .pipe(gulp.dest('./example/dist/'));
});

gulp.task('nodeunit', function() {
  return gulp.src('./test/*.js')
    .pipe(nodeunit({
        reporter: 'junit',
        reporterOptions: {
            output: 'reports'
        }
    }));
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['clean', 'lint', 'emailBuilder', 'nodeunit']);

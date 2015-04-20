var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodeunit = require('gulp-nodeunit');
var runSequence = require('run-sequence');
var emailBuilder = require('./lib/emailBuilder');

gulp.task('clean', function (cb) {
  return del([
    './example/dist',
    './reports'
  ], cb);
});

gulp.task('emailBuilder', function() {
  return gulp.src(['./example/html/*.html'])
    .pipe(emailBuilder())
    .pipe(gulp.dest('./example/dist/'));
});

gulp.task('nodeunit', function() {
  return gulp.src('./test/*_test.js')
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

gulp.task('test', function(callback) {
  runSequence('clean', 'lint', 'emailBuilder', 'nodeunit', callback);
});

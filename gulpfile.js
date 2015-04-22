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

  var options = {
    emailTest : {

      // Your Email
      email : 'yourEmail@email.com',

      // Your email Subject
      subject : 'Email Subject',

      // Optional
      transport: {
        type: 'SMTP',
        service: 'gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'gmailpass'
        }
      }
    }
  };

  return gulp.src(['./example/html/*.html'])
    .pipe(emailBuilder(options))
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

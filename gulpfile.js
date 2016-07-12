var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
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
    .pipe(emailBuilder().build())
    .pipe(gulp.dest('./example/dist/'));
});

// Send to Email 
gulp.task('sendEmail', function(){
  return gulp.src(['./example/html/email.html'])
    .pipe(emailBuilder({
      emailTest: {
        email : process.env.GMAIL_USER,
        subject : 'Email Subject',
        nodemailer: {
          transporter: {
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS
            }
          }
        }
      }
    }));
});

// Send to Litmus
gulp.task('sendLitmus', function(){
  return gulp.src(['./example/html/email.html'])
    .pipe(emailBuilder({
      litmus : {
        subject : 'Custom subject line',
        username : process.env.LIT_USER,
        password : process.env.LIT_PASS,
        url : process.env.LIT_URL,
        applications : ['gmailnew', 'hotmail', 'outlookcom', 'ol2000', 'ol2002', 'ol2003', 'ol2007', 'ol2010','ol2011', 'ol2013', 'appmail8', 'iphone5', 'ipad3']
      }
    }));
});

gulp.task('mochaTest', function() {
  return gulp.src('./test/*_test.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function(callback) {
  runSequence('clean', 'lint', 'emailBuilder', 'mochaTest', callback);
});

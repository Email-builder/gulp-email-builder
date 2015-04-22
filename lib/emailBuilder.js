// through2 is a thin wrapper around node transform streams
var gutil = require('gulp-util');
var through = require('through2');
var EmailBuilderCore = require('email-builder-core');

var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-email-builder';

// Plugin level function(dealing with files)
function gulpEmailBuilder(options) {

  // var emailOptions = Object.assign(options, EmailBuilder.Defaults);
  // console.log(emailOptions);
  var emailBuilder = new EmailBuilderCore(options);


  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Cannot read strams');
    }

    if (file.isBuffer()) {
      emailBuilder.inlineCss(file.path)
        .bind(this)
        .then(emailBuilder.sendLitmusTest)
        .then(emailBuilder.sendEmailTest)
        .then(function(html) {

          file.contents = new Buffer(html);
          cb(null, file);

        })
        .catch(function(err){
            console.log(err);
        });
    }

  });

}

// Exporting the plugin main function
module.exports = gulpEmailBuilder;

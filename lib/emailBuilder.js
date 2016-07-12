// through2 is a thin wrapper around node transform streams
var gutil = require('gulp-util');
var through = require('through2');
var EmailBuilderCore = require('email-builder-core');
var path = require('path');

var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-email-builder';


// Plugin level function(dealing with files)
function GulpEmailBuilder(options) {

  if(!(this instanceof GulpEmailBuilder)){
    return new GulpEmailBuilder(options);
  }

  this.options = options || {}; 
}

GulpEmailBuilder.prototype.build = function build(){
  // Creating a stream through which each file will pass
  var emailBuilder = new EmailBuilderCore(this.options);
  return through.obj(function(file, enc, cb) {
      
      if (file.isNull()) {
        // return empty file
        cb(null, file);
      }

      if (file.isStream()) {
        throw new PluginError(PLUGIN_NAME, 'Cannot read streams');
      }

      if (file.isBuffer()) {
        emailBuilder.options.relativePath = file.base;
        emailBuilder.inlineCss(file.contents)
          .bind(emailBuilder)
          .then(emailBuilder.sendLitmusTest)
          .then(emailBuilder.sendEmailTest)
          .then(function(html) {

            file.contents = new Buffer(html);
            cb(null, file);

          })
          .catch(cb);
      }
  });
};

GulpEmailBuilder.prototype.inlineCss = function inlineCss(){
  var emailBuilder = new EmailBuilderCore(this.options);

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME + '#inlineCss', 'Cannot read streams');
    }

    if (file.isBuffer()) {
      emailBuilder.options.relativePath = file.base;
      emailBuilder.inlineCss(file.contents)
        .bind(emailBuilder)
        .then(function(html) {
          file.contents = new Buffer(html);
          cb(null, file);
        })
        .catch(cb);
    }

  });
};

GulpEmailBuilder.prototype.sendEmailTest = function sendEmailTest(){

  if(!this.options.emailTest){
    throw new PluginError(PLUGIN_NAME + '#sendEmailTest', 'need to provide options.emailTest property to send email test');
  }

  var emailBuilder = new EmailBuilderCore(this.options);

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME + '#sendEmailTest', 'Cannot read streams');
    }

    if (file.isBuffer()) {
      emailBuilder.sendEmailTest(file.contents)
        .bind(emailBuilder)
        .then(function(html) {
          file.contents = new Buffer(html);
          cb(null, file);
        })
        .catch(cb);
    }

  });
};

GulpEmailBuilder.prototype.sendLitmusTest = function sendLitmusTest(){
  
  if(!this.options.litmus){
    throw new PluginError(PLUGIN_NAME + '#sendLitmusTest', 'need to provide options.litmus property to send Litmus test');
  }

  var emailBuilder = new EmailBuilderCore(this.options);

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME + '#sendLitmusTest', 'Cannot read streams');
    }

    if (file.isBuffer()) {
      emailBuilder.sendLitmusTest(file.contents)
        .bind(emailBuilder)
        .then(function(html) {
          file.contents = new Buffer(html);
          cb(null, file);
        })
        .catch(cb);
    }

  });
};

// Exporting the plugin main function
module.exports = GulpEmailBuilder;

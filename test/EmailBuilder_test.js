var expect = require('chai').expect;
var sinon =  require('sinon');
var builder = require('../lib/emailBuilder');
var fs = require('fs');
var File = require('vinyl');
var path = require('path');
var core = require('email-builder-core');
var Promise = require('bluebird');
var gutil = require('gulp-util');

function getFile(filePath) {
    return new File({
        path: path.resolve(filePath),
        cwd: './test/',
        base: path.dirname(filePath),
        contents: fs.readFileSync(filePath)
    });
}

function getPromise(html){
  return Promise.resolve(html)
}

describe('gulp-email-builder', function () {

  var stream, stub, spy;
  var cwd = process.cwd();
  var src = fs.readFileSync(cwd + '/test/expected/email.html');
  var options = {
    emailTest : {
      email : 'yourEmail@email.com',
      subject : 'Email Subject'
    }, 
    litmus : {
      username : 'username',
      password : 'password',
      url : 'https://yoursite.litmus.com',
      applications : ['gmailnew']
    }
  }

  it('should inline css', function(done){

    spy = sinon.spy(core.prototype, 'inlineCss');

    stream = builder({}).build();
    stream.write(getFile(cwd + '/example/html/email.html'));    
    stream.once('data', function(file){
      expect(file.isBuffer()).to.be.true;
      expect(file.contents.toString()).to.equal(src.toString());
      expect(spy.called).to.be.true;
      done();
    });

  });

  it('should call sendLitmusTest if `litmus` option defined', function(done){
   
    stub =  sinon.stub(core.prototype, 'sendLitmusTest', getPromise);
    
    stream = builder(options).sendLitmusTest();
    stream.write(getFile(cwd + '/example/html/email.html'));    
    stream.once('data', function(file){
      expect(stub.called).to.be.true;
      done();
    });

  });

  it('should call sendEmailTest if `emailTest` option defined', function(done){
   
    stub =  sinon.stub(core.prototype, 'sendEmailTest', getPromise);

    stream = builder(options).sendEmailTest();
    stream.write(getFile(cwd + '/example/html/email.html'));    
    stream.once('data', function(file){
      expect(stub.called).to.be.true;
      done();
    });

  });

  it('should throw error if `sendLitmusTest` is called without options', function(){
    expect(function(){ builder({}).sendLitmusTest() }).to.throw(Error);
  });

  it('should throw error if `sendEmailTest` is called without options', function(){
    expect(function(){ builder({}).sendEmailTest() }).to.throw(Error);
  });

});
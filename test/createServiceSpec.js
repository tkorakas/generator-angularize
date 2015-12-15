'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require("fs");

describe('Expeted to create a service', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../service'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .on('end', done);

  })
  it('should create a js file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/services/test.js'));
    assert.fileContent(path.join(__dirname, './temp/app/js/services/test.js'), 'app.service(\'test\', function() {});');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/services/test.js'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/services'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

describe('Expeted to create a service with coffeescript', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../service'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .withOptions({coffee: true})
        .on('end', done);

  })
  it('should create a coffee file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/services/test.coffee'));
    assert.fileContent(path.join(__dirname, './temp/app/js/services/test.coffee'), 'app.service \'test\', () ->');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/services/test.coffee'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/services'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

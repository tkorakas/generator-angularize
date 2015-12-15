'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require("fs");

describe('Expeted to create a directive', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../directive'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .on('end', done);

  })
  it('should create a js file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/directives/test.js'));
    assert.fileContent(path.join(__dirname, './temp/app/js/directives/test.js'), 'app.directive(\'test\', function()');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/directives/test.js'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/directives'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

describe('Expeted to create a directive with coffeescript', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../directive'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .withOptions({coffee: true})
        .on('end', done);

  })
  it('should create a coffee file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/directives/test.coffee'));
    assert.fileContent(path.join(__dirname, './temp/app/js/directives/test.coffee'), 'app.directive \'test\', ()->');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/directives/test.coffee'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/directives'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

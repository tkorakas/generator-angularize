'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require("fs");

describe('Expeted to create a filter', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../filter'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .on('end', done);

  })
  it('should create a js file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/filters/test.js'));
    assert.fileContent(path.join(__dirname, './temp/app/js/filters/test.js'), 'app.filter(\'test\', function()');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/filters/test.js'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/filters'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

describe('Expeted to create a filter with coffeescript', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../filter'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .withOptions({coffee: true})
        .on('end', done);

  })
  it('should create a coffee file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/filters/test.coffee'));
    assert.fileContent(path.join(__dirname, './temp/app/js/filters/test.coffee'), 'app.filter \'test\', ()->');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/filters/test.coffee'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/filters'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

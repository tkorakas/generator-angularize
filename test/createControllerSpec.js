'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require("fs");

describe('Expeted to create a controller', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../controller'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .on('end', done);

  })
  it('should create a js file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/controllers/test.js'));
    assert.fileContent(path.join(__dirname, './temp/app/js/controllers/test.js'), 'app.controller(\'testCtrl\', function(){');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/controllers/test.js'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/controllers'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

describe('Expeted to create a controller with coffeescript', function() {
  before(function(done) {
      helpers.run(path.join(__dirname, '../controller'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .withOptions({coffee: true})
        .on('end', done);

  })
  it('should create a coffee file', function(done) {
    assert.file(path.join(__dirname, './temp/app/js/controllers/test.coffee'));
    assert.fileContent(path.join(__dirname, './temp/app/js/controllers/test.coffee'), 'app.controller \'testCtrl\', ()->');
    fs.unlinkSync(path.join(__dirname, './temp/app/js/controllers/test.coffee'))
    fs.rmdirSync(path.join(__dirname, './temp/app/js/controllers'));
    fs.rmdirSync(path.join(__dirname, './temp/app/js'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

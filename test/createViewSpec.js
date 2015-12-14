'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require("fs");

describe('Expeted to create a view', function() {
  before(function(done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function() {
      helpers.run(path.join(__dirname, '../view'))
        .inDir(path.join(__dirname, './temp/app/'))
        .withArguments('test')
        .on('end', done);
    });

  })
  it('should create a html file', function(done) {
    assert.file(path.join(__dirname, './temp/app/templates/test.html'));
    assert.fileContent(path.join(__dirname, './temp/app/templates/test.html'), 'Hello from test');
    fs.unlinkSync(path.join(__dirname, './temp/app/templates/test.html'))
    fs.rmdirSync(path.join(__dirname, './temp/app/templates'));
    fs.rmdirSync(path.join(__dirname, './temp/app'));
    fs.rmdirSync(path.join(__dirname, './temp'));
    done();
  });
});

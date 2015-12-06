'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

	constructor: function(){
		generators.Base.apply(this, arguments);
	},

	_createFileStructrure: function(){
		var destRoot = this.destinationRoot();
		var appDir = destRoot + '/app';

		mkdirp(appDir + '/js');
		mkdirp(appDir + '/js/controllers');
		mkdirp(appDir + '/js/services');
		mkdirp(appDir + '/js/directives');
		mkdirp(appDir + '/js/filters');
		mkdirp(appDir + '/style');
		mkdirp(appDir + '/style/sass');
		mkdirp(appDir + '/templates');

		this.fs.copy(this.sourceRoot() + '/root/_.bowerrc', destRoot + '/.bowerrc');
		this.fs.copy(this.sourceRoot() + '/root/_bower.json', destRoot + '/bower.json');
	},

	_createGruntFile: function(){
		this.gruntfile.insertConfig('clean', 'files: ["dist"]');
	},
	
	initialazing: function(){

	},
	prompting: function(){
		var done = this.async();
	    this.prompt({
	      type    : 'input',
	      name    : 'name',
	      message : 'Your project name',
	      default : this.appname // Default to current folder name
	    }, function (answers) {
	      this.log(answers.name);
	      done();
	    }.bind(this));
	},
	writing: function(){
		this._createFileStructrure();
		// this._createGruntFile();
	}
});

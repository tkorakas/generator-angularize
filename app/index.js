'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
	_fileStructrure: function(){
		var destRoot = this.destinationRoot();
		var appDir = destRoot + '/app';

		mkdirp(appDir + '/js');
		mkdirp(appDir + '/js/controllers');
		mkdirp(appDir + '/js/services');
		mkdirp(appDir + '/js/directives');
		mkdirp(appDir + '/js/filters');
		mkdirp(appDir + '/sass');
		mkdirp(appDir + '/css');
		mkdirp(appDir + '/templates');

		this.fs.copy(this.sourceRoot() + '/.bowerrc', destRoot + '/.bowerrc');
		this.fs.copy(this.sourceRoot() + '/bower.json', destRoot + '/bower.json');

	}
});
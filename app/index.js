'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

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
	
	initializing: function(){
		var message = chalk.blue('Welcome to Angularize ' + chalk.red('A simple AngularJS generator.'));
		this.log(yosay(message, {maxLength: 21}));
	},
	prompting: function(){
		var done = this.async();
	    this.prompt([{
	      type    : 'input',
	      name    : 'name',
	      message : 'Your project name:',
	      default : this.appname // Default to current folder name
	    },{
	    	type: 'input',
	    	name: 'description',
	    	message: 'Project description:'
	    },{
	    	type: 'input',
	    	name: 'author',
	    	message: 'Your name:'
	    },{
	    	type: 'input',
	    	name: 'email',
	    	message: 'Your email:'
	    },{
	    	type: 'input',
	    	name: 'github/bitbucket',
	    	message: 'Your project git repository:'
	    },{
	    	type: 'input',
	    	name: 'version',
	    	message: 'Project version:',
	    	default: '0.0.0'
	    },{
	    	type: 'input',
	    	name: 'license',
	    	message: 'Project license type:',
	    	default: 'MIT'
	    },{
	    	type: 'input',
	    	name: 'website',
	    	message: 'Your website:'
	    }], function (answers) {
	      this.appName = answers.name;
	      done();
	    }.bind(this));
	},
	writing: function(){
		// this._createFileStructrure();
		// this._createGruntFile();
	}
});

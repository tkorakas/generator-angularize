'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);
        this.option('coffee');
        this.option('less');
        this.option('sass');
        this.jsExtension = this.options.coffee ? "coffee" : "js";
        if (!this.options.sass && !this.options.less) {
            this.cssExtension = "css"
        } else {
            this.cssExtension = this.options.sass ? "scss" : "less"
        }
    },
    _createFileStructrure: function () {
        var destRoot = this.destinationRoot();
        var appDir = destRoot + '/app';
        var templateContext = {
            appName: this.appName.split(" ").join(""),
            appDescription: this.appDescription,
            appVersion: this.appVersion,
            appAuthor: this.appAuthor,
            appEmail: this.appEmail,
            appLicense: this.appLicense,
            appGit: this.appGit,
            appWebsite: this.appWebsite,
            cssExtension: this.cssExtension,
            coffee: this.jsExtension,
            angularLib: this.angLibs,
            angRouter: this.angRouter == 'angular-ui-router' ? 'ui.router' : 'ngRoute',
            angInclude: this.angLibs.map(function(lib){
              var library = lib.split('-');
              var capitalize = library[1].charAt(0).toUpperCase() + library[1].slice(1);
              return 'ng' + capitalize;
            })
        };
        templateContext.angularLib.push(this.angRouter);

        // Create folder structure.
        mkdirp(appDir + '/js');
        mkdirp(appDir + '/js/controllers');
        mkdirp(appDir + '/js/services');
        mkdirp(appDir + '/js/directives');
        mkdirp(appDir + '/js/filters');
        mkdirp(appDir + '/images');
        mkdirp(appDir + '/tests');
        mkdirp(appDir + '/templates');
        this.fs.copy(this.sourceRoot() + '/root/_.bowerrc', destRoot + '/.bowerrc');
        this.fs.copyTpl(this.sourceRoot() + '/root/_bower.json', destRoot + '/bower.json', templateContext);
        this.fs.copyTpl(this.sourceRoot() + '/root/_index.html', appDir + '/index.html', templateContext);
        this.fs.copyTpl(this.sourceRoot() + '/root/_app.' + this.jsExtension, appDir + '/app.' + this.jsExtension, templateContext);
        this.fs.copyTpl(this.sourceRoot() + '/root/_gulpfile.js', destRoot + '/gulpfile.js', templateContext);
        this.fs.copyTpl(this.sourceRoot() + '/root/_package.json', destRoot + '/package.json', templateContext);
        this.fs.copyTpl(this.sourceRoot() + '/views/_main.html', appDir + '/templates/main.html', templateContext);
        this.fs.copy(this.sourceRoot() + '/javascript/' + this.jsExtension + '/mainCtrl.' + this.jsExtension, appDir + '/js/controllers/mainCtrl.' + this.jsExtension);
        if (this.option.less && this.option.sass) {
            this.fs.copy(this.sourceRoot() + '/styles/style.' + this.cssExtension, appDir + '/styles/' + this.cssExtension + 'style.' + this.cssExtension);
        } else {
            this.fs.copy(this.sourceRoot() + '/styles/style.' + this.cssExtension, appDir + '/styles/style.' + this.cssExtension);
        }
    },
    initializing: function () {
        var message = chalk.blue('Welcome to Angularize ' + chalk.red('A simple AngularJS generator.'));
        this.log(yosay(message, {maxLength: 21}));
    },
    prompting: function () {
        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name:',
            default: this.appname,
        }
            , {
                type: 'input',
                name: 'description',
                message: 'Project description:'
            }
            , {
                type: 'input',
                name: 'author',
                message: 'Your name:'
            }
            , {
                type: 'input',
                name: 'email',
                message: 'Your email:'
            }
            , {
                type: 'input',
                name: 'git',
                message: 'Your project git repository:'
            }
            , {
                type: 'input',
                name: 'version',
                message: 'Project version:',
                default: '0.0.0'
            }
            , {
                type: 'input',
                name: 'license',
                message: 'Project license type:',
                default: 'MIT'
            }
            , {
                type: 'input',
                name: 'website',
                message: 'Your website:'
            },{
              type: 'checkbox',
              name: 'libs',
              message: 'Which angular libraries would you like to use?',
              choices: [{
                name: 'Angular aria',
                value: 'angular-aria',
                checked: true
              },{
                name: 'Angular animate',
                value: 'angular-animate',
                checked: false
              },{
                name: 'Angular messages',
                value: 'angular-messages',
                checked: true
              },{
                name: 'Angular resoure',
                value: 'angular-resource',
                checked: false
              },{
                name: 'Angular sanitize',
                value: 'angular-sanitize',
                checked: true
              },{
                name: 'Angular touch',
                value: 'angular-touch',
                checked: false
              }]
            },{
              type: 'list',
              name: 'router',
              message: 'Which angular router would you like to use?',
              choices: [{
                name: 'ngRoute',
                value: 'angular-route'
              },{
                name: 'UI Router',
                value: 'angular-ui-router'
              }], default: 1
            }], function (answers) {
            this.appName = answers.name;
            this.appDescription = answers.description;
            this.appAuthor = answers.author;
            this.appEmail = answers.email;
            this.appRepo = answers.git;
            this.appVersion = answers.version;
            this.appLicense = answers.license;
            this.appWebsite = answers.website;
            this.angLibs = answers.libs;
            this.angRouter = answers.router;
            done();
        }.bind(this));
    },
    writing: function () {
        this._createFileStructrure();
    },
    install: function () {
        this.bowerInstall();
        this.npmInstall();
    }
});

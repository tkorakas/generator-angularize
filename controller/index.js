'use strict';

var generators = require('yeoman-generator');

module.exports = generators.generators.NamedBase.extend({
  constructor: function() {
    generators.NamedBase.apply(this, arguments);
    this.option('coffee');
  },
  createController: function(){
    var destRoot = this.destinationRoot().split('/');
    var appDir = '/'
    var context = {
      controllerName: this.name.split(" ").join("").toLowerCase()
    };

    var jsExtension = this.options.coffee ? '.coffee' : '.js';
    if (destRoot.indexOf('app') != -1) {
      destRoot.slice(1, destRoot.indexOf('app')).forEach(function(folder) {
        appDir += folder + '/'
      });
      this.fs.copyTpl(this.sourceRoot() + '/_controller' + jsExtension, appDir + 'app/js/controllers/' + context.controllerName + jsExtension, context);
    } else {
      var context = {
        viewName: this.name.split(" ").join("").toLowerCase()
      };
      this.fs.copyTpl(this.sourceRoot() + '/_controller' + jsExtension, this.destinationRoot() + '/app/js/controllers/' + context.controllerName + jsExtension, context);
    }
  }
})

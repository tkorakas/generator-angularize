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
    if (destRoot.indexOf('app') != -1) {
      destRoot.slice(1, destRoot.indexOf('app')).forEach(function(folder) {
        appDir += folder + '/'
      });
      var context = {
        name: this.name.split(" ").join("").toLowerCase()
      };
      var jsExtension = this.options.coffee ? '.coffee' : '.js';
      this.fs.copyTpl(this.sourceRoot() + '/_service' + jsExtension, appDir + 'app/js/services/' + context.name + jsExtension, context);
    } else {
      var context = {
        viewName: this.name.split(" ").join("").toLowerCase()
      };
      this.fs.copyTpl(this.sourceRoot() + '/_service' + jsExtension, this.destinationRoot() + '/app/js/services/' + context.name + jsExtension, context);
    }
  }
})

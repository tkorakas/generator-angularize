'use strict';

var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  constructor: function() {
    generators.NamedBase.apply(this, arguments);
    this.option('coffee');
  },
  createController: function(){
    var destRoot = this.destinationRoot().split('/');
    var appDir = '/'
    var context = {
      name: this.name.split(" ").join("").toLowerCase()
    };
    var jsExtension = this.options.coffee ? '.coffee' : '.js';
    if (destRoot.indexOf('app') != -1) {
      destRoot.slice(1, destRoot.indexOf('app')).forEach(function(folder) {
        appDir += folder + '/'
      });
      this.fs.copyTpl(this.sourceRoot() + '/_filter' + jsExtension, appDir + 'app/js/filters/' + context.name + jsExtension, context);
    } else {
      this.fs.copyTpl(this.sourceRoot() + '/_filter' + jsExtension, this.destinationRoot() + '/app/js/filters/' + context.name + jsExtension, context);
    }
  }
})

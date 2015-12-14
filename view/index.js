'use strict';

var generators = require('yeoman-generator');

module.exports = generators.generators.NamedBase.extend({
  constructor: function() {
    generators.NamedBase.apply(this, arguments);
  },
  createView: function() {
    var destRoot = this.destinationRoot().split('/');
    var appDir = '/'
    if (destRoot.indexOf('app') != -1) {
      destRoot.slice(1, destRoot.indexOf('app')).forEach(function(folder) {
        appDir += folder + '/'
      });
      var context = {
        viewName: this.name.split(" ").join("").toLowerCase()
      };
      this.fs.copyTpl(this.sourceRoot() + '/_view.html', appDir + 'app/templates/' + context.viewName + '.html', context);
    } else {
      var context = {
        viewName: this.name.split(" ").join("").toLowerCase()
      };
      this.fs.copyTpl(this.sourceRoot() + '/_view.html', this.destinationRoot() + '/app/templates/' + context.viewName + '.html', context);
    }

  }
})

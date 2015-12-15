'use strict';

var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  constructor: function() {
    generators.NamedBase.apply(this, arguments);
  },
  createView: function() {
    var destRoot = this.destinationRoot().split('/');
    var appDir = '/';
    var context = {
      viewName: this.name.split(" ").join("").toLowerCase()
    };
    if (destRoot.indexOf('app') != -1) {
      destRoot.slice(1, destRoot.indexOf('app')).forEach(function(folder) {
        appDir += folder + '/'
      });
      this.fs.copyTpl(this.sourceRoot() + '/_view.html', appDir + 'app/templates/' + context.viewName + '.html', context);
    } else {
      this.fs.copyTpl(this.sourceRoot() + '/_view.html', this.destinationRoot() + '/app/templates/' + context.viewName + '.html', context);
    }

  }
})

'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function(){
    generators.NamedBase.apply(this, arguments);
  },
  createView: function(){
    var destRoot = this.destinationRoot().split('/');
    var appDir = '/'
    destRoot.slice(1, destRoot.indexOf('app')).forEach(function(folder){
      appDir += folder + '/'
    });
    var context = {
      viewName: this.name.split(" ").join("").toLowerCase()
    };
    this.fs.copyTpl(this.sourceRoot() + '/_view.html', appDir + 'app/templates/' + context.viewName + '.html', context);
  }
})

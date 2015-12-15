'use strict';

app.directive '<%= name %>', ()->
  ()->
    template: '<div></div>',
    restrict: 'E',
    link: postLink(scope, element, attributes)->
      element.text('this is the <%= name %> directive')

'use strict';

app.directive('<%= name %>', function() {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attributes) {
      element.text('this is the <%= name %> directive');
    }
  }
});

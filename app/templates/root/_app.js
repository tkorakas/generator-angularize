'use strict';
var app = angular.module('<%= appName %>', ['<%= angRouter %>'<% angInclude.forEach(function(lib) { %>,'<%= lib %>'<% }); %>]);

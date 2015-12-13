app = angular.module '<%= appName %>', ['<%= angRouter %>'<% angInclude.forEach(function(lib) { %>,'<%= lib %>'<% }); %>]

<% if (angRouter == 'ui.router'){ %>
app.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise "/"
  $stateProvider
    .state 'main', {
      url: "/",
      templateUrl: "templates/main.html",
      controller: "mainCtrl"
    }
<% }else{ %>
app.config ($routeProvider) ->
  $routeProvider
    .when '/', {
        templateUrl : 'templates/main.html',
        controller  : 'mainCtrl'
    }
    .otherwise '/'
<% } %>

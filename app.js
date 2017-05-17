var app = angular.module('myApp', [
  'ngRoute',
  'ngMaterial'
]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .otherwise({ redirectTo: '/' })
    .when('/', {
      title: 'Home',
      templateUrl: 'resources/modulos/lista/lista.template.html',
      controller: 'ListaController',
      controllerAs: 'listCtrl'
    });
}]);
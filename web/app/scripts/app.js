'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngResource',
    'config'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/people/list', {
        templateUrl: 'views/people/list.html',
        controller: 'PeopleCtrl'
      })
//FIXME - Future Enhancements when backend supports this
//      .when('/people/create', {
//        templateUrl: 'views/people/create.html',
//        controller: 'PeopleCtrl'
//      })
//      .when('/people/:id/edit', {
//        templateUrl: 'views/people/edit.html',
//        controller: 'PeopleCtrl'
//      })
//      .when('/people/:id/view', {
//        templateUrl: 'views/people/view.html',
//        controller: 'PeopleCtrl'
//      })
      .otherwise({
        redirectTo: '/'
      });
  });

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
        'ngSanitize',
        'ngTouch',
        'ngResource',
        'ui.router',
        'config'

    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', { // state for showing home
                url:'/home',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('employees', { // state for showing all movies
                url: '/employee/list',
                templateUrl: 'views/employee/list.html',
                controller: 'EmployeeListCtrl'
            }).state('viewEmployee', { //state for showing single movie
                url: '/employee/:id/view',
                templateUrl: 'views/employee/view.html',
                controller: 'EmployeeViewCtrl'
            }).state('newEmployee', { //state for adding a new movie
                url: '/employee/new',
                templateUrl: 'views/employee/create.html',
                controller: 'EmployeeNewCtrl'
            }).state('editEmployee', { //state for updating a movie
                url: '/employee/:id/edit',
                templateUrl: 'views/employee/edit.html',
                controller: 'EmployeeEditCtrl'
            });
    }])
    .run(['$state', function ($state) {
        $state.go('home'); //make a transition to movies state when app starts
    }]);

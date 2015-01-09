'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('PeopleCtrl',['$scope','$http',function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.get('http://localhost:9000/people').
        success(function(data, status, headers, config) {
            alert(data);
        }).
        error(function(data, status, headers, config) {
            alert(data);
        });
  }]);

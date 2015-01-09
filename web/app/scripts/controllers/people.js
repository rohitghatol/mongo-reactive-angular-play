'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('PeopleCtrl',['$scope','$http','ENV',function ($scope,$http,ENV) {


    $http.get(ENV.apiEndpoint+'/people').
        success(function(data, status, headers, config) {
            $scope.peoples=data;
            $scope.error=null;
        }).
        error(function(data, status, headers, config) {
            $scope.peoples=null;
            $scope.error='Failed to load People';
        });
  }]);

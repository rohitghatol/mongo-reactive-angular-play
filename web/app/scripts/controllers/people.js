'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('PeopleCtrl',['$scope','PeopleService','$location',function ($scope,PeopleService,$location) {
        $scope.peoples = PeopleService.query();

        $scope.create = function(){
            console.log($scope.person);
            PeopleService.save($scope.person,function(){
                console.log("Data is saved");
                $scope.$apply( $location.path( '/people/list' ) );
            });

        }



  }]);

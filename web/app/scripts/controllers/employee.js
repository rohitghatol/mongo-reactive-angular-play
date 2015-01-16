'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the appApp
 */
angular.module('appApp')
    .controller('EmployeeListCtrl',['$scope', 'EmployeeService', '$state', '$http',
        function ($scope, EmployeeService, $state, $http) {
            $http.defaults.headers.common['REST-API-KEY-HEADER'] = 'dummy';

            $scope.employees = EmployeeService.query();

            $scope.deleteEmployee = function (id) { // Delete a movie. Issues a DELETE to /api/movies/:id
                EmployeeService.delete({id: id}, function () {
                    $scope.employees = EmployeeService.query();
                    $state.go('employees',{reload:true});
                });
            };

        }])
    .controller('EmployeeNewCtrl',['$scope', 'EmployeeService', '$state', '$http',
        function ($scope, EmployeeService, $state, $http) {
            $http.defaults.headers.common['REST-API-KEY-HEADER'] = 'dummy';

            $scope.employee = new EmployeeService();  //create new movie instance. Properties will be set via ng-model on UI

            $scope.addEmployee = function() { //create a new movie. Issues a POST to /api/movies
                $scope.employee.$create(function() {
                    $state.go('employees'); // on success go back to home i.e. movies state.
                });
            };

        }])
    .controller('EmployeeViewCtrl', ['$scope', 'EmployeeService', '$stateParams', '$http','$state',
        function ($scope, EmployeeService, $stateParams, $http,$state) {
            $http.defaults.headers.common['REST-API-KEY-HEADER'] = 'dummy';

            $scope.employee = EmployeeService.get({ id:$stateParams.id });

        }])

   .controller('EmployeeEditCtrl', ['$scope', 'EmployeeService', '$stateParams', '$http','$state',
        function ($scope, EmployeeService, $stateParams, $http,$state) {
            $http.defaults.headers.common['REST-API-KEY-HEADER'] = 'dummy';

            $scope.employee = EmployeeService.get({ id:$stateParams.id });

            $scope.editEmployee = function () {

                $scope.employee.$update(function () {
                    $state.go('employees');
                });

            }

        }]);

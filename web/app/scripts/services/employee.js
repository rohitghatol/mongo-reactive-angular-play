'use strict';

/**
 * @ngdoc service
 * @name appApp.employee
 * @description
 * # employee
 * Service in the appApp.
 */
angular.module('appApp')
//  .service('EmployeeService',['$http','ENV',function($http,ENV) {
//    return {
//        list: function(callback) {
//            $http.get(ENV.apiEndpoint+'/employee').success(callback)
//        }
//    }
//}]
//);

.factory('EmployeeService',['$resource','ENV', function($resource,ENV) {
    return $resource(ENV.apiEndpoint+'/employees/:id',{} , {
        update: {
            method: 'PUT',params:{ id: '@_id' }
        },
        create: {
            method: 'POST'
        }
    });
     //return $resource(ENV.apiEndpoint+'/employees/:id');
}]);

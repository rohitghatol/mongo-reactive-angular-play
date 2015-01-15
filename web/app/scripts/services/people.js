'use strict';

/**
 * @ngdoc service
 * @name appApp.people
 * @description
 * # people
 * Service in the appApp.
 */
angular.module('appApp')
//  .service('PeopleService',['$http','ENV',function($http,ENV) {
//    return {
//        list: function(callback) {
//            $http.get(ENV.apiEndpoint+'/people').success(callback)
//        }
//    }
//}]
//);

.factory('PeopleService',['$resource','ENV', function($resource,ENV) {
    return $resource(ENV.apiEndpoint+'/people:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
}]);

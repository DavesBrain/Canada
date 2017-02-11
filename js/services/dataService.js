(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .service('dataService', dataService)
    
    dataService.$inject = ['$http', '$filter'];
    
    function dataService($http, $filter) {

        var dataService = {};
        
        var _getProvinces = function () {
            return $http({
              method: 'GET',
              url: 'data/provinces.json'
            })
            .then(function successCallback(response) {
                return response;
            },
                function errorCallback(response) {
                return response;
            });
        }

        var _getCities = function (params) {
            return $http({
              method: 'GET',
              url: 'data/cities.json'
            })
            .then(function successCallback(response) {
                
                angular.forEach(response.data, function(value, key) {
                    console.log(key, value);
                });
                
                return response;
            },
                function errorCallback(response) {
                return response;
            });
        }

        
        dataService.getProvinces = _getProvinces;
        dataService.getCities = _getCities;
        
        return dataService;
    }
})();
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
        
        dataService.getProvinces = _getProvinces;
        
        return dataService;
    }
})();
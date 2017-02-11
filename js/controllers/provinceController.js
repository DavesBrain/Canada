(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .service('provinceController', dataService)
    
    provinceController.$inject = ['$http', '$filter'];
    
    function provinceController($http, $filter) {

    }
})();
(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('index', {
                    name: 'index',
                    url: '/',
                    templateUrl: 'js/views/provinces.html',
                    controllerAs: 'provincesController',
                    data: { pageTitle: 'Main' }
                })
                .state('province', {
                    name:'province',
                    url: '/province/:id',
                    templateUrl: 'js/views/province.html',
                    controllerAs: 'provinceController',
                    data: { pageTitle: 'Province' }

                })
            
            
        }]);
})();
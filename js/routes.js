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
                .state('cities', {
                    name:'cities',
                    url: '/cities/:id',
                    templateUrl: 'js/views/cities.html',
                    controllerAs: 'citiesController',
                    data: { pageTitle: 'Cities' }

                })
            
            
        }]);
})();
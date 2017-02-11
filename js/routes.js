(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('index', {
                    name: 'index',
                    url: '#',
                    templateUrl: 'index.html',
                    controller: 'mainController',
                    data: { pageTitle: 'Main' }
                })
                .state('province', {
                    name:'province',
                    url: '/province/:code',
                    templateUrl: 'js/views/province.html',
                    controller: 'provinceController',
                    data: { pageTitle: 'Province' }
                })
            
            
        }]);
})();
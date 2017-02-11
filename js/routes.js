(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('index', {
                    name: 'index'
                    url: '#',
                    templateUrl: 'index.html',
                    controller: 'mainController',
                    controllerAs: 'mainVm',
                    data: { pageTitle: 'Main' }
                })
                .state('province', {
                    name:'province',
                    url: '/province',
                    templateUrl: 'js/views/province.html',
                    controller: 'provinceController',
//                    controllerAs: 'provinceVm',
                    data: { pageTitle: 'Province' }
                })
            
//            .state('contacts', {
//                template: '<h1>My Contacts</h1>'
//            })
            
        }]);
})();
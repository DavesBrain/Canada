var CanadaApp = angular.module('CanadaApp', [ "ui.router","ui.bootstrap" ]);
//var CanadaApp = angular.module('CanadaApp', [ "ui.bootstrap" ]);

    CanadaApp.controller('mainController', ['$scope', 'dataService', function($scope, dataService) {
        
         var getProvinceData = function (){
            return dataService.getData().then(
                function successCallback(response) {
                    options.success(response);
                },
                function errorCallback(response) {
                    // handle error
                }
            );
        };
        
        $scope.id = "foo";
    }]);
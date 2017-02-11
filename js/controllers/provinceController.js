(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .controller('provinceController', ['$scope', 'dataService', 'uiGridConstants', function($scope, dataService,  uiGridConstants) {

            $scope.controls = {};
            $scope.params = "yu";
            
            
            var init = function (){
                getCityData($scope.params);
            };

            var getCityData = function (params){
                return dataService.getCities(params).then(
                    function successCallback(response) {
                         $scope.gridOptions.data = response.data;
                    },
                    function errorCallback(response) {
                        // handle error
                    }
                );
            };

            
            console.log("!"); 
            
            $scope.gridOptions = {
                enableFiltering: false,
                enableRowSelection: true, 
                onRegisterApi: function(gridApi){
                    $scope.gridApi = gridApi;
                    $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
    //                $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
    //                    var msg = 'row selected ' + row.isSelected;
    //                    //Open your link here.
    //                });
                },
                columnDefs: [
                    { field: 'name' },
                    { field: 'population' }
                ]
            };  
            
            init();
  
    }]);
})();
(function() {
    'use strict';

    angular
        .module('CanadaApp')

        .controller('provincesController', ['$scope', 'dataService', 'uiGridConstants', function($scope, dataService,  uiGridConstants) {
        
        $scope.controls = {};
        
        var init = function (){
            getProvincesData();
            console.log(":)");
        };
        
        var getProvincesData = function (){
            return dataService.getProvinces().then(
                function successCallback(response) {
                     $scope.gridOptions.data = response.data;
                },
                function errorCallback(response) {
                    // handle error
                }
            );
        };
        
        $scope.gridOptions = {
//            enableFiltering: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
//            onRegisterApi: function(gridApi){
//                $scope.gridApi = gridApi;
//                $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
//                $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
//                    var msg = 'row selected ' + row.isSelected;
//                    //Open your link here.
//                });
//            },
            columnDefs: [
                { field: 'name' },
                { field: 'population' },
            ]
        };        
          $scope.gridOptions.multiSelect = false;
          $scope.gridOptions.modifierKeysToMultiSelect = false;
          $scope.gridOptions.noUnselect = true;
          $scope.gridOptions.onRegisterApi = function( gridApi ) {
              $scope.gridApi = gridApi;
               gridApi.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected ' + row.isSelected;
                //Open your link here.
              });
          };

            
            
        $scope.filter = function() {
            $scope.gridApi.grid.refresh();
        };

        $scope.clear = function() {
            $scope.controls.filterString = "";
            $scope.gridApi.grid.refresh();
        };
        
        
        $scope.singleFilter = function( renderableRows ){
            var matcher = new RegExp($scope.controls.filterString);
            renderableRows.forEach( function( row ) {
                var match = false;
                [ 'name', 'population' ].forEach(function( field ){
                    if ( row.entity[field].match(matcher) ){
                        match = true;
                    }
                });
                if ( !match ){
                    row.visible = false;
                }
            });
            return renderableRows;
        };

        init();
        
  
    }]);
})();
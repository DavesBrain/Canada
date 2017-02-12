(function() {
    'use strict';

    angular
        .module('CanadaApp')

        .controller('provincesController', ['$scope', '$state', 'dataService', 'uiGridConstants', function($scope,  $state, dataService,  uiGridConstants) {
        
        $scope.controls = {};
        
        var init = function (){
            getProvincesData();
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
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
                gridApi.selection.on.rowSelectionChanged($scope,function(row){
                    $state.go('cities', {id: row.entity.code});
                });
            },
            columnDefs: [
                { 
                    displayName: 'Province/Territory',
                    field: 'name'
                },{ 
                    field: 'population',
                    cellTemplate: '<div class="ui-grid-cell-contents align-right">{{grid.getCellValue(row, col) | number}}</div>',
                    type: 'number',
                    sort: {
                        direction: uiGridConstants.DESC
                    }
                },
            ]
        };        
            
        $scope.filter = function() {
            $scope.gridApi.grid.refresh();
        };

        $scope.clear = function() {
            $scope.controls.filterString = "";
            $scope.gridApi.grid.refresh();
        };
        
        $scope.singleFilter = function( renderableRows ){
            var matcher = new RegExp($scope.controls.filterString, 'i');
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
(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .controller('citiesController', ['$scope', 'dataService', 'uiGridConstants', '$stateParams', function($scope, dataService,  uiGridConstants, $stateParams) {
            
            $scope.controls = {};
            
            var init = function (){
                getCityData($stateParams.id);
            };

            var getCityData = function (params){
                return dataService.getCities(params).then(
                    function successCallback(response) {
                        $scope.gridOptions.data = response.data.cities;
                        $scope.provinceName = response.data.name;
                        $scope.provinceId = response.data.id;
                    },
                    function errorCallback(response) {
                        // handle error
                    }
                );
            };

            $scope.gridOptions = {
                enableFiltering: false,
                onRegisterApi: function(gridApi){
                    $scope.gridApi = gridApi;
                    $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
                },
                columnDefs: [
                    { 
                        field: 'name',
                        displayName: 'Cities'
                    },{ 
                        field: 'population', 
                        cellTemplate: '<div class="ui-grid-cell-contents align-right">{{grid.getCellValue(row, col) | number}}</div>',
                        type: 'number',
                        sort: {
                            direction: uiGridConstants.DESC
                        }
                    }
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
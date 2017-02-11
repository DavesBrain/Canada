(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .controller('provinceController', ['$scope', 'dataService', 'uiGridConstants', function($scope, dataService,  uiGridConstants) {
            
            $scope.controls = {};
            $scope.params = "yt";
            $scope.controls = {};
            
            
            var init = function (){
                getCityData($scope.params);
            };

            var getCityData = function (params){
                console.log(params);
                return dataService.getCities(params).then(
                    function successCallback(response) {
                        $scope.gridOptions.data = response.data.cities;
                        $scope.provinceName = response.data.name;
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
                    { field: 'name' },
                    { field: 'population', sortingAlgorithm: $scope.sortPop }// not working as expected
                ]
            };  
            
            
            $scope.sortPop = function(a, b, rowA, rowB, direction){
                console.log("!!!");
                if (a == b) return 0;
                if (a < b) return -1;
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
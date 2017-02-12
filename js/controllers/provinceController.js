(function() {
    'use strict';

    angular
        .module('CanadaApp')
        .controller('provinceController', ['$scope', 'dataService', 'uiGridConstants', '$stateParams', function($scope, dataService,  uiGridConstants, $stateParams) {
            
            $scope.controls = {};
            $scope.params = "sk";
            
            console.log("id: ",$stateParams.id);
                                           
            var init = function (){
                console.log("$stateParams.id: ",$stateParams.id);
                console.log("$scope.params: ", $scope.params);
                getCityData($stateParams.id);
            };

            var getCityData = function (params){
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
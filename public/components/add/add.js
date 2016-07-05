var app = angular.module("CalorieApp");

app.controller("AddController", ["$scope", "FatService", "FoodService", function ($scope, FatService, FoodService) {
    $scope.FatService = FatService;
    $scope.FoodService = FoodService;
    $scope.addView = 'search';
    
}]);
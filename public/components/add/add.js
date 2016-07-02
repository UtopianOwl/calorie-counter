var app = angular.module("CalorieApp");

app.controller("AddController", ["$scope", "fatService", "mealService", function ($scope, fatService, mealService) {
    $scope.fatService = fatService;
    $scope.mealService = mealService;
    $scope.addView = 'search';
    
}]);
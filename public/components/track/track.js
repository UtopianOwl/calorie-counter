var app = angular.module("CalorieApp");


app.controller("TrackController", ["$scope", "FoodService", function($scope, FoodService){
    //getfood function
    $scope.foodService = FoodService;
    $scope.viewerDate = 
    
    $scope.trackFoodDay = function(){
        var date = {
            day: viewerDate.date,
            month: viewerDate.month,
            year: view
        }
        FoodService.getFoods(date).then(function(response){
            response.data
        })
    } 
        
}]);
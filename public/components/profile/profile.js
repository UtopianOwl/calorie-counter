/*Make and link controller*/

var app = angular.module("CalorieApp");

app.controller("ProfileController", ["$scope", "UserService", function($scope, UserService){
    $scope.UserService = UserService;
    
    
}]); 
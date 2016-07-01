/*Make and link controller*/

var app = angular.module("CalorieApp");

app.controller("ProfileController", ["$scope", function($scope){
//    hard coded user object
    $scope.user = {};
    $scope.user.name = "Joy";
    $scope.user.user = "capstone";
    $scope.user.email = "mail@email.com";
    $scope.user.password = "abcd1234"; 
    
//hard coded userdata object    
    $scope.userData = {};
    $scope.userData.age = "30";
    $scope.userData.height = "5.4";
    $scope.userData.weight = "180";
    $scope.userData.gender = "male";
    $scope.userData.goal = "live a happy life";
    
    
}]); 
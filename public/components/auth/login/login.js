var app = angular.module("CalorieApp.Auth");

app.controller("loginCtrl", ["$scope", "UserService", "$location", function ($scope, UserService, $location) {
    $scope.login = function(user) {
        UserService.login(user).then(function (response) {
            $location.path("/home");
        }, function (response) {
            alert("There was a problem: " + response.data.message);
        });
    }
}]);
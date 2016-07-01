var app = angular.module("CalorieApp.Auth");

app.controller("signupCtrl", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.passwordMessage = "";

    $scope.signup = function (user) {
        if (user.password != $scope.passwordRepeat) $scope.passwordMessage = "Passwords must match!";
        else {
            UserService.signup(user).then(function (response) {
                UserService.login(user).then(function (response) {
                    $location.path("/home");
                }, function (response) {
                    alert("There was a problem: " + response.data.message);
                });
            }, function (response) {
                alert("There has been a problem: " + response.data.message);
            });
        }
    }
}]);
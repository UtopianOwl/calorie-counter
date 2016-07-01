var app = angular.module("CalorieApp.Auth");

app.controller("logoutCtrl", ["UserService", function (UserService) {
    UserService.logout();
}]);
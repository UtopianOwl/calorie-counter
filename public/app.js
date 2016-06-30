var app = angular.module("CalorieApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/welcome/welcome.html",
            controller: "WelcomeController"
        })
        .when("/add", {
            templateUrl: "components/add/add.html",
            controller: "AddController"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "ProfileController"
        })
        .when("/track", {
            templateUrl: "components/track/track.html",
            controller: "TrackController"
        })  
        .otherwise({
            redirectTo: "/"
        });
});
var app = angular.module("CalorieApp.Auth", ['ngRoute', 'ngStorage']);

app.config(['$httpProvider', '$routeProvider', function ($httpPovider, $routeProvider) {
    $httpPovider.interceptors.push("AuthInterceptor");

    $routeProvider
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'components/auth/login/login.html',
            resolve: {
                factory: notLoggedIn
            }
        })
        .when('/signup', {
            controller: 'signupCtrl',
            templatUrl: 'components/auth/signup/signup.html',
            resolve: {
                factory: notLoggedIn
            }
        })
        .when('/logout', {
            controller: 'logoutCtrl',
            template: ''
        });
}]);

app.factory("AuthInterceptor", ["$location". "$q", "TokenService", function ($location, $q, TokenService) {
    return {
        request: function (config) {
            var token = TokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = "Bearer " + token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path("/login");
            }
            return $q.reject(response);
        }
    }
}]);

var notLoggedIn = function($q, $location, UserService) {
    var defer = $q.defer();
    if (!UserService.isAuthticated()) defer.resolve(true);
    else {
        defer.reject("logged in")
        $location.path("/home")
    }
}
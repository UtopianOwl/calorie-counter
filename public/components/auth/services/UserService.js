var app = angular.module ("CalorieApp");

app.service("UserService", ["$http", "$location", "TokenService", function ($http, $location, TokenService) {
    var self = this;
    this.currentUser = {};
    
    this.signup = function(user) {
        return $http.post("/auth/signup", user).then(function(response) {
            return response;
        });
    };
    this.login = function(user) {
        return $http.post("/auth/login", user).then(function(response) {
            TokenService.setToken(response.data.token);
            self.currentUser = response.data.user;
            return response;
        });
    };
    this.logout = function() {
        TokenService.removeToken();
        $location.path("/")
    }
    this.edit = function() {
        $http.put("/auth/edit/" + self.currentUser._id, self.currentUser).then(function (response) {
            self.currentUser = response.data;
        });
    }
    this.isAuthenticated = function () {
        return TokenService.getToken();
    }
}]);
var app = angular.module("CalorieApp");

app.service("FoodService", ["$http", function($http) {
    var self = this; 
    this.foodList = [];
    this.food = {}; 
    var baseUrl = "reaches out to api"
    
    this.getFoods = function() {
        return $http.get(baseUrl).then(function(response) {
            self.foodList = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText); 
        });
    } 
    
    this.getFood = function(food) {
        return $http.get(baseUrl + food._id).then(function(response) {
            self.food = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.addFood = function(food) {
        return $http.post(baseUrl, food  ).then(function(response) {
            self.foodList.push(response.data); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.deleteFood = function(index, food) {
        return $http.delete(baseUrl + food._id).then(function(response) {
            self.foodList.splice(index, 1); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.updateFood = function(index, food) {
        return $http.put(baseUrl + food._id, food).then(function(response) {
            self.foodList[index] = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
}]);
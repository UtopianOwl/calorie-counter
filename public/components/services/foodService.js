var app = angular.module("CalorieApp");

app.service("FoodService", ["$http", function($http) {
    var self = this; 
    this.foodList = [];
    this.food = {}; 
    
    this.getFoods = function() {
        return $http.get("/api/foods").then(function(response) {
            self.foodList = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText); 
        });
    } 
    
    this.getFood = function(food) {
        return $http.get("/api/foods/" + food._id).then(function(response) {
            self.food = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.addFood = function(food) {
        return $http.post("/api/foods", food).then(function(response) {
            self.foodList.push(response.data); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.deleteFood = function(index, food) {
        return $http.delete("/api/foods/" + food._id).then(function(response) {
            self.foodList.splice(index, 1); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.updateFood = function(index, food) {
        return $http.put("/api/foods/" + food._id, food).then(function(response) {
            self.foodList[index] = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
}]);
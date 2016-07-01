var app = angular.module("CalorieApp");

app.service("MealService", ["$http", function($http) {
    var self = this; 
    this.mealList = [];
    this.meal = {}; 
    var baseUrl = "reaches out to api"
    
    this.getMeals = function() {
        return $http.get(baseUrl).then(function(response) {
            self.mealList = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText); 
        });
    } 
    
    this.getMeal = function(meal) {
        return $http.get(baseUrl + meal._id).then(function(response) {
            self.meal = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.addMeal = function(meal) {
        return $http.post(baseUrl, meal  ).then(function(response) {
            self.mealList.push(response.data); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.deleteMeal = function(index, meal) {
        return $http.delete(baseUrl + meal._id).then(function(response) {
            self.mealList.splice(index, 1); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
    this.updateMeal = function(index, meal) {
        return $http.put(baseUrl + meal._id, meal).then(function(response) {
            self.mealList[index] = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
    
}]);
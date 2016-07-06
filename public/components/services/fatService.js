var app = angular.module("CalorieApp");

app.service("FatService", ["$http", function ($http) {
    var self = this;
    this.searchResults = [];
    this.currentFood = {};
    var n = 0;
    var nonce = Math.random().toString(36).replace(/[\W]/g, '');
    var requestUrl = "http://platform.fatsecret.com/rest/server.api";
    var sigBase = {
        format: "json",
        oauth_consumer_key: "40a95beb5d134a4aa81ec584486a23d9",
        oauth_signature_method: "HMAC-SHA1",
        oauth_version: 1.0,
    };

    var concat = function (object) {
        var keys = Object.keys(object).sort();
        var concatString = "";
        for (var i = 0; i < keys.length; i++) {
            if (i === 0) {
                concatString += keys[i] + "=" + object[keys[i]];
            } else {
                concatString += "&" + keys[i] + "=" + object[keys[i]];
            }
        }
        return concatString;
    };

    var percentEncode = function (string) {
        string.replace(/!/g, "%21");
        string.replace(/#/g, "%23");
        string.replace(/\$/g, "%24");
        string.replace(/&/g, "%26");
        string.replace(/'/g, "%27");
        string.replace(/\(/g, "%28");
        string.replace(/\)/g, "%29");
        string.replace(/\*/g, "%2A");
        string.replace(/\+/g, "%2B");
        string.replace(/,/g, "%2C");
        string.replace(/\//g, "%2F");
        string.replace(/:/g, "%3A");
        string.replace(/;/g, "%3B");
        string.replace(/=/g, "%3D");
        string.replace(/\?/g, "%3F");
        string.replace(/@/g, "%40");
        string.replace(/\[/g, "%5B");
        string.replace(/]/g, "%5D");
        return string;
    };

    var fatsecretGet = function (params) {
        var httpMethod = "GET";
        
        var concatParams = concat(params);
        
        console.log(concatParams);
        
        var sigBaseString = httpMethod + "&" + percentEncode(requestUrl) + "&" + percentEncode(concatParams);
        var wordArray = CryptoJS.enc.Utf8.parse(sigBaseString);
        var base64 = CryptoJS.enc.Base64.stringify(wordArray);
        
        params.oauth_signature = percentEncode(base64);
        
        return $http({
            method: httpMethod,
            url: requestUrl,
            params: params
        }).then(function (response) {
            console.log(response);
            return response.data;
        });
    };

    this.fatSearch = function (searchTerm) {
        sigBase.max_results = 50;
        sigBase.method = "foods.search";
        sigBase.oauth_timestamp = new Date;
        sigBase.oauth_nonce = nonce + n;
        sigBase.search_expression = searchTerm;
        n++;
        fatsecretGet(sigBase).then(function(data) {
            console.log(data);
            self.searchResults = data.foods;
        })
    };

    this.getFood = function (id) {
        sigBase.oauth_timestamp = new Date;
        sigBase.oauth_nonce = nonce + n;
        sigBase.food_id = id;
        sigBase.method = "food.get";

        fatsecretGet(sigBase).then(function(data) {
            self.currentFood = data.food;
        })
    };
}]);
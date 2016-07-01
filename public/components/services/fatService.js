var app = angular.module("CalorieApp");

app.service("fatService", ["$http", function ($http) {
    var self = this;
    this.searchResults = {};
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
        var keys = Object.keys(sigBase).sort();
        var concatString = "";

        for (var i = 0; i < keys.length; i++) {
            if (i = 0) {
                concatString += key[i] + "=" + sigBase[key[i]];
            } else {
                concatString += "&" + key[i] + "=" + sigBase[key[i]];
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

    var fatsecretGet = function (params, url) {
        var httpMethod = "GET";

        var sigBaseString = httpMethod + "&" + percentEncode(url) + "&" + percentEncode(concat(params));

        params.oauth_signature = percentEncode(CryptoJs.enc.Base64.stringify(sigBaseString));

        $http({
            method: "GET",
            url: url,
            params: params
        }).then(function (response) {
            self.searchResults = response.data;
        });
    };

    this.fatSearch = function (searchTerm) {
        sigBase.max_results = 50;
        sigBase.method = "foods.search";
        sigBase.oauth_timestamp = new Date;
        sigBase.oauth_nonce = nonce + n;
        sigBase.search_expression = searchTerm;
        n++;

        fatsecretGet(sigBase, requestUrl);
    };

    this.getFood = function (id) {
        sigBase.oauth_timestamp = new Date;
        sigBase.oauth_nonce = nonce + n;
        sigBase.food_id = id;
        sigBase.method = "food.get";

        fatsecretGet(sigBase, requestUrl);
    };
}]);
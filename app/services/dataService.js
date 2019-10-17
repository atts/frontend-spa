angular.module('myApp.service', [])
    .service('DataService', function($http) {
        this.data = null;
        this.getData = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/getData'
            }).then(function successCallback(response) {
                return response.data
            }, function errorCallback(response) {
                return response;
            });
        }

        this.saveData = function(param) {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/saveData',
                params: param
            }).then(function successCallback(response) {
                return "Details added successfully"
            }, function errorCallback(response) {
                return "Some error occurred !";
            });
        };
    });
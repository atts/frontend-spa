'use strict';

angular.module('myApp.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view', {
        templateUrl: 'view/view.html',
        controller: 'ViewCtrl'
    });
}])

.controller('ViewCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {

    $scope.isLoaded = false;
    $scope.isAdded = true;

    DataService.getData().then(function(data) {
        console.log(data);
        if (data.length) {
            $scope.firstNum = data[0].Number1;
            $scope.secondNum = data[0].Number2;
            $scope.result = data[0].Result;
        } else {
            $scope.reset();
        }
        $scope.isLoaded = true;
    })

    $scope.validate = function(arg) {
        switch (arg) {
            case 1:
                $scope.isFirstInValid = checkInValidInput($scope.firstNum);
                break;
            case 2:
                $scope.isSecondInValid = checkInValidInput($scope.secondNum);
                break;
            default:

        }
    }

    function checkInValidInput(arg) {
        $scope.result = "";
        if ((!isNaN(arg) && parseFloat(arg) >= 0) || arg == "") {
            return false;
        } else {
            return true;
        }
    }

    $scope.enableCalcButton = function() {
        if ($scope.firstNum && $scope.secondNum && !$scope.isFirstInValid && !$scope.isSecondInValid) {
            return true;
        } else {
            return false;
        }
    }

    $scope.calculate = function() {
        $scope.result = $scope.firstNum * $scope.secondNum;
    }

    $scope.enableSaveButton = function() {
        if ($scope.result == '0' || $scope.result) {
            return true;
        } else {
            return false;
        }
    }

    $scope.reset = function() {
        $scope.isFirstInValid = false;
        $scope.isSecondInValid = false;
        $scope.firstNum = "";
        $scope.secondNum = "";
        $scope.result = "";
    }

    $scope.save = function() {
        $scope.isAdded = false;
        let timeStamp = new Date().toISOString();
        let data = {
            'Number1': $scope.firstNum,
            'Number2': $scope.secondNum,
            'Result': $scope.result,
            'Timestamp': timeStamp
        }
        DataService.saveData(data).then(function(res) {
            console.log(res);
            $scope.isAdded = true;
        })
    }

}]);
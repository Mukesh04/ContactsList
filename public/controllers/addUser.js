'use strict';

angular.module('ContactApp')

    .controller('addUserCtrl', ['$scope', 'formDataDescription', function($scope,formDataDescription){

        var formData = {};
        $scope.formSubmission = function() {

            formData.firstname = $scope.first_name;
            formData.lastname = $scope.last_name;
            formData.gender = $scope.gender.name;
            formData.street = $scope.street;
            formData.city = $scope.city;
            formData.state = $scope.state;
            formData.phone = parseInt($scope.phone);
            formDataDescription.add(formData);

        };




    }]);


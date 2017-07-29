'use strict';

angular.module('ContactApp')

    .controller('updateUserCtrl', ['$scope','$location','view2Service','formDataDescription', function($scope,$location,view2Service,formDataDescription){
        //Update
       $scope.edit = view2Service.getEditUserData();

        $scope.updateFormSubmission = function(){
            view2Service.editUserData($scope.edit).then(function(res, rej){
                    $scope.edit = res.data;
                    console.log("Updated Successfully");
                    $location.path('/contactLists');
                }, function(rej) {
                    $location.path('/error');
                    console.log("Update Not Successfully");
                });


        };



    }]);
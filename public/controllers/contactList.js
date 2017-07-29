'use strict';

angular.module('ContactApp')

    .controller('contactListCtrl', ['$scope','formDataDescription','view2Service','$location', function($scope,formDataDescription,view2Service,$location){


        //get
        view2Service.studentInfo().then(function(res){
            $scope.getContactDetails = res.data;

        },function(rej){
            return rej;
        });


        //edit
       $scope.editUser = function(obj){
           view2Service.setEditUserData(obj);
           $location.path('/updateUser');
       };


        //delete

        $scope.deleteUser = function(object){
            confirm("Are You Sure to Delete" + "      " +object.firstname);
            view2Service.removeUser(object._id)
            .then(function(res){
                console.log("Successfully Deleted....");
                $location.path('/contactLists');
            },function(rej) {
                return rej;
                console.log("Not successfully Deleted");
                $location.path('/error');
            });
        }

    }]);






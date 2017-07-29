var app = angular.module('ContactApp');
    app.service('formDataDescription', ['$http','$location', function($http,$location){


        //post
        var add = function(formData) {
            $http({
                method: 'POST',
                url: '/student',
                data: formData
            }).then(
                function (response) {
                    console.log("User Successfully Added....");
                    $location.path("/contactLists");
                }, function (error) {
                    console.log("User Not Successfully Added....");
                    $location.path("/error");
                });

        };

        return {
            add:add
        }


    }]);
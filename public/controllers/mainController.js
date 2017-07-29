 angular.module("ContactApp", ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/addUsers', {
            templateUrl: 'views/addUser.html',
            controller: 'addUserCtrl'
        })
        .when('/contactLists', {
            templateUrl: 'views/contactList.html',
            controller: 'contactListCtrl'
        })
        .when('/updateUser', {
            templateUrl: 'views/updateUser.html',
            controller: 'updateUserCtrl'
        })
        .when('/error', {
            templateUrl: 'views/error.html',
            controller: 'errorCtrl'
        })
        .otherwise('/addUsers', {
            templateUrl: 'views/addUser.html',
            controller: 'addUserCtrl'
        })
    }])

    .controller('ContactCtrl', ['$scope', function($scope){

        $scope.controller = "ContactCtrl";

    }]);



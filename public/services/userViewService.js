var app = angular.module('ContactApp');
    app.service('view2Service', ['$http', function($http){

        //get
        var editDetail = null;
            var studentInfo = function () {
                return $http.get("/student")
            };

            var setEditUserData =function(obj){
                editDetail =  obj;
            };


            var getEditUserData =function(){
                return editDetail;
            };

            //put
            var editUserData = function(editdatdetails) {
                return $http.put('/student/id/'+editdatdetails._id ,editdatdetails);

            };

            //delete
            var removeUser = function(id) {

                return $http.delete('/student/id/'+id);
            };

            return {
                studentInfo:studentInfo,
                setEditUserData:setEditUserData,
                getEditUserData:getEditUserData,
                editUserData:editUserData,
                removeUser:removeUser
            }


    }]);




'use strict';

latinApp.controller("UserAvatarController", function($scope, $window, UserFactory){

    //get userid
    let currentUser = UserFactory.getUser();
    //get user object
    UserFactory.userCheck(currentUser)
    .then((userObj)=>{
        let userKey = Object.keys(userObj);
        $scope.userObj = userObj[userKey];
        $scope.name = userObj[userKey].name;
        $scope.avatar = userObj[userKey].photoUrl;
        //put on scope so index can access values
    });
});
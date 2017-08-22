'use strict';

latinApp.controller("NewUserController", function($scope, $window, UserFactory, VideoFactory){

    //get userid
    let currentUser = UserFactory.getUser();
    //get user object
    UserFactory.userCheck(currentUser)
    .then((userObj)=>{
        let userKey = Object.keys(userObj);
        $scope.userObject = userObj[userKey];
    });
    //use info from user object to populate the new user welcome partial by putting the user object on scope
});
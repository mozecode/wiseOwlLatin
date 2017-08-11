'use strict';

latinApp.controller("NewUserController", function($scope, $window, UserFactory, VideoFactory){

    //get userid
    let currentUser = UserFactory.getUser();
    //get user object
    UserFactory.userCheck(currentUser)
    .then((userObj)=>{
        console.log ("userObjnewUser", userObj);
        let userKey = Object.keys(userObj);
        console.log ("userKey",userKey);
        $scope.userObject = userObj[userKey];
        console.log ("userObject on scope", $scope.userObject);
    });
    //use info from user object to populate the new user welcome partial by putting the user object on scope

});
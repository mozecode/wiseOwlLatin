'use strict';

latinApp.controller("UserAvatarController", function($scope, $window, UserFactory){

    //get userid
    let currentUser = UserFactory.getUser();
    console.log ("currentUser", currentUser);
    //get user object
    UserFactory.userCheck(currentUser)
    .then((userObj)=>{
        console.log ("userObj", userObj);
        let userKey = Object.keys(userObj);
        console.log ("userKey", userKey);
        $scope.userObj = userObj[userKey];
        console.log ("userObjavatar", userObj[userKey]);
        $scope.name = userObj[userKey].name;
        $scope.avatar = userObj[userKey].photoUrl;
        //put on scope so index can access values
    });
});
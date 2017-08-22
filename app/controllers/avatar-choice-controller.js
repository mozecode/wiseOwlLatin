'use strict';

latinApp.controller("AvatarChoiceController", function($scope, $window, UserFactory){

    $scope.newAv={
        photo:""
    };

    $scope.saveNewAvatar=()=>{
        //get user id
        let currentUser=UserFactory.getUser();
        //get user object
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            let userKey = Object.keys(userObj);
            $scope.userAv = userObj[userKey];
             //change the value of the photoUrl to the one chosen by the user
            $scope.userAv.photoUrl= $scope.newAv.photo;
             //should show user object with new avatar on it as the value for photoUrl
            UserFactory.patchUpdatedUserOnFB($scope.userAv, userKey) //replace the object on firebase
            .then((userData)=>{
               $window.location.href ='#!/newUser';
            });
        // direct user to new view & new avatar should pop up based on existing code for $scope.avatar
        });
    };
});
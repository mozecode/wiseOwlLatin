'use strict';

latinApp.controller("AvatarChoiceController", function($scope, $window, UserFactory){

//do I have to declare the obj on scope here as a stand-alone? to catch the ng model value?
    $scope.newAv={
        photo:""
    };


    $scope.saveNewAvatar=()=>{
        //get user id
        let currentUser=UserFactory.getUser();
        //get user object
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            console.log ("userObjforavatarchoice",userObj);
            let userKey = Object.keys(userObj);
            $scope.userAv = userObj[userKey];
            console.log ("$scope.userAv",$scope.userAv);
             //change the value of the photoUrl to the one chosen by the user
            console.log ("newAv", $scope.newAv.photo);
            $scope.userAv.photoUrl= $scope.newAv.photo;
            console.log ("userAvwithnewavatar?", $scope.userAv.photoUrl);
             //should show user object with new avatar on it as the value for photoUrl
             UserFactory.patchUpdatedUserOnFB($scope.userAv, userKey)
             .then((userData)=>{
               $window.location.href ='#!/newUser';
             });
        //replace the object on firebase

        // direct user to new view & new avatar should pop up based on existing code for $scope.avatar
        });


    };
});
'use strict';

latinApp.controller("UsernameChoiceController", function($scope, $window, UserFactory){

    //create new object to hold value of roman username on scope
    $scope.newName={
        romanName:""
    };

    $scope.saveNewRomanName=()=>{
        //get user id
        let currentUser = UserFactory.getUser();
        //get user obj
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            let userKey = Object.keys(userObj);
            $scope.userName = userObj[userKey];//userobj to be modified below:
            $scope.userName.name = $scope.newName.romanName;
            //change value of name to value chosen by the user
            UserFactory.patchUpdatedUserOnFB($scope.userName, userKey)
            //patch the updated user info on firebase
            .then((userData)=>{
                $window.location.href ='#!/newUser';
                //direct user back to new user page
            });
        });
    };
});
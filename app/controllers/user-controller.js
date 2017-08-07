'use strict';
//to create user object to pass into create user
latinApp.controller("UserController", function($scope, $window, UserFactory){

//create user object with placeholders
    var name, email, photoUrl, uid, emailVerified;
    $scope.acct = {
            name:"",
            email:"",
            photoUrl:"",
            uid:""
    };

//get help with this part

$scope.register =()=>{
    UserFactory.loginUser($scope.user)
    .then((user)=>{
        console.log ("userInfo",user);
//need to reassign values in acct object above
            $scope.acct.name= user.user.cf.displayName;
            $scope.acct.email= user.user.email;
            $scope.acct.photoUrl= user.user.photoURL;
            $scope.acct.uid= user.user.uid;
//then post it to FB to persist user data
        console.log ("scope.acct", $scope.acct);
        UserFactory.postNewUserToFB($scope.acct)
        .then((userData)=>{
            console.log ("new user! YAY!", userData);

        });
    });
};

$scope.login=()=>{

     UserFactory.loginUser($scope.user)
    .then((userData)=>{
        console.log ("userData", userData.user.uid);
        //check to see if user exists in FB
        UserFactory.userCheck(userData.user.uid)
        .then((data)=>{
            console.log ("userCheckdata", data);
        });
          //if so, bring up that user's favorites listed on the object
        $window.location.href = '#!/faves';
    });
};





});

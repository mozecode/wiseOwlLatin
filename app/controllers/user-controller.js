'use strict';
//to create user object to pass into create user
latinApp.controller("UserController", function($scope, $window, UserFactory){

    $scope.user = {

  //look at usercontroller for todo app for reference
    };

//get help with this part

$scope.register =()=>{
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
       // if (user != null) {
        //     name = user.displayName;
        //     email = user.email;
        //     photoUrl = user.photoURL;
        //     emailVerified = user.emailVerified;
        //     uid = user.uid;
        //  }

    UserFactory.postNewUserToFB($scope.user)
    .then((userData)=>{
        console.log ("new user! YAY!", userData);
        $scope.login();
    });

};

$scope.login=()=>{
    UserFactory.loginUser($scope.user)
    .then((userData)=>{
        console.log ("userData",userData);
        $window.location.href = '#!/faves';
    });
};





});

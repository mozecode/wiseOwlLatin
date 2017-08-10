'use strict';
//to create user object to pass into create user
latinApp.controller("UserController", function($scope, $window, UserFactory, VideoFactory){

//create user object with placeholders
    var name, email, photoUrl, uid, emailVerified;
    $scope.acct = {
            name:"",
            email:"",
            photoUrl:"",
            uid:"",
            faves: 0//space needed here
    };

    $scope.register =()=>{
        UserFactory.loginUser($scope.user)
        .then((user)=>{
            console.log ("userInfo",user);
            //need to reassign values in acct object above
                $scope.acct.name= user.user.cf.displayName;
                $scope.acct.email= user.user.email;
                $scope.acct.photoUrl= user.user.photoURL;
                $scope.acct.uid= user.user.uid;
            //compare this object to what already exists in FB so that the user isn't duplicated
            console.log ("scope.acct", $scope.acct.uid);
            UserFactory.userCheck($scope.acct.uid)
            .then((data)=>{
                let uid;
                for(var key in data){
                    uid = data[key].uid;
                }
                console.log ("uid", uid);//Google uid
                //if there is already a user object with that Google uid in firebase, they can go ahead and enter
                if (uid){
                    console.log ("You have already registered. Salve! ");
                    $window.location.href = '#!/faves';
                }else{
                    //if the userCheck fails, post the new user's object to FB
                    UserFactory.postUserToFB($scope.acct)
                    .then((userData)=>{
                    console.log ("new user! YAY!", userData);
                    });
                }
            });
        });
    };
});

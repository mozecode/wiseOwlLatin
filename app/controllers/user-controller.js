'use strict';
//to create user object to pass into create user
latinApp.controller("UserController", function($scope, $window, UserFactory){

//create user object with placeholders
    var name, email, photoUrl, uid, emailVerified;
    $scope.acct = {
            name:"",
            email:"",
            photoUrl:"",
            uid:"",
            faves:[] //store topic_id for each video added to faves
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
            console.log ("uid", uid);

//compare to what to find out if user already exists?
//uid inside object in Firebase versus uid assigned during login?
            if (uid){
                console.log ("You have already registered. Salve! ");
            }else{

                UserFactory.postNewUserToFB($scope.acct)
                .then((userData)=>{
                console.log ("new user! YAY!", userData);

                });

            }
            // if they exist already-- alert("You have already registered"), if not then post them

        });

        //where to direct new users without faves?
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

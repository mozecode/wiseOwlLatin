'use strict';

latinApp.controller("NavController", function($scope, $window, FilterFactory, UserFactory){

    $scope.isLoggedIn = false;//default

    firebase.auth().onAuthStateChanged(function(user){
        //listener to see if you have a logged in user
        if (user){
            $scope.isLoggedIn =true; //linked to ng-show in navbar partial
            console.log ("currentUser?", user.uid);
            console.log ("logged in state", $scope.isLoggedIn);
            $scope.$apply();  //alert angular that state has changed (apply changes)
        }else{
            $scope.isLoggedIn = false;
            $scope.$apply();
            console.log ("userLoggedin?", $scope.isLoggedIn);
            $window.location.href = "#!/login";  //redirect user to log in page if not logged in
        }

    });


    $scope.openNav=()=> {
        console.log ("Open nav clicked");
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    };

    $scope.closeNav=()=> {
        console.log ("close Nav clicked");
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    };

    $scope.logout =()=>{
        console.log ("logout initiated");
        UserFactory.logoutUser();
        $scope.closeNav();
        $window.location.href ='#!/login';

    };
});

'use strict';

latinApp.controller("VideoController",function($scope, $window, $routeParams, UserFactory, VideoFactory){

    $scope.isAuth =()=> new Promise((resolve, reject)=>{
         if(UserFactory.isAuthenticated()){
             console.log("User is authenticated, resolve route promise");
            resolve();
        } else {
        // console.log("User is not authenticated, reject route promise");
        reject();
        }
    });

    $scope.topic = VideoFactory.getTopicData();
    console.log ("scope.topic",$scope.topic);
});
'use strict';

latinApp.controller("VideoController",function($scope, $window, $routeParams, UserFactory, VideoFactory){

    $scope.isAuth =()=> new Promise((resolve, reject)=>{
         if(UserFactory.isAuthenticated()){
            resolve();
        } else {
            reject();
        }
    });

    $scope.topic = VideoFactory.getTopicData();
});
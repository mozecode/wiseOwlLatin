'use strict';
latinApp.controller("FavesController", function($scope, $window, UserFactory, VideoFactory){

    $scope.postVideoToUserFaves=(videoId, topicId)=>{//fires on click of add to favorites button on video
        VideoFactory.getOneTopic(topicId)
        .then((topic)=>{
            //reduce that topic object to just the video object that matches the id of the card clicked
            let topicKey = Object.keys(topic);
            let vidObj = topic[topicKey].videos.reduce(function(prev,curr){
                return curr.video_id === videoId ? curr:prev;}, null);
            //get userObject
            let currentUser = UserFactory.getUser();
            UserFactory.userCheck(currentUser)
            .then((userObj)=>{
                let userKey= Object.keys(userObj);
                //get key of user object and use to do a patch to replace original value of faves on the user object with an array of objects as user adds faves
                if (userObj[userKey].faves === 0 || !userObj[userKey].faves){
                    userObj[userKey].faves = [];
                }
                    userObj[userKey].faves.push(vidObj);
                UserFactory.patchUpdatedUserOnFB(userObj[userKey], userKey)
                .then((newUserData)=>{
                    $window.location.href="#!/faves";
                });
            });
        });
    };

    let getUserFaves=()=>{
        let currentUser = UserFactory.getUser();
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            let userKey= Object.keys(userObj);
            $scope.faves = userObj[userKey].faves;
        });

    };

    getUserFaves(); //call immediately so app can track changes and respond if the view changes to faves on either click or login of existing user

    $scope.deleteUserFaves=(videoId)=>{
        //video id of video passed in on click
        let currentUser = UserFactory.getUser();
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            let userKey= Object.keys(userObj);
            let favesArr= userObj[userKey].faves;
            // //store values of faves in array
            //delete object we need to get rid of based on video id, but save the rest in an array
            let savedFavesArr= favesArr.filter(function(obj){
                return obj.video_id!== videoId;
            });//want it to return all the objects that don't have that videoId
            userObj[userKey].faves = savedFavesArr;
             //reassign value to object
            UserFactory.patchUpdatedUserOnFB(userObj[userKey],userKey)
            .then((deletedFaves)=>{
                getUserFaves();
            });
            //patch that obj back onto FB
         });
    };
});

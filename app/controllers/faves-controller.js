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
                console.log ("vidObjinside.then",vidObj);
                console.log ("userObjinsidefaves",userObj);
                let userKey= Object.keys(userObj);
                //get key of user object and use to do a patch to replace original value of faves on the user object with an array of objects as user adds faves
                    if (userObj[userKey].faves === 0){
                    userObj[userKey].faves = [];
                    }
                    userObj[userKey].faves.push(vidObj);
                UserFactory.patchUpdatedUserOnFB(userObj[userKey], userKey)
                .then((newUserData)=>{
                    console.log ("newUserData",newUserData);
                });
            });
        });
    };

    let getUserFaves=()=>{
        let currentUser = UserFactory.getUser();
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            console.log("userforfavescheck", userObj);
            let userKey= Object.keys(userObj);
            console.log ("userKeyforFavesCheck", userKey);
            $scope.faves = userObj[userKey].faves;
            console.log ("scope.faves",$scope.faves);
        });

    };

    getUserFaves();
});

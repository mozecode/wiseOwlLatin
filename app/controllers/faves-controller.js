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
                    console.log ("newUserData",newUserData);
                    // alert('Successfully added to favorites.');
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

    getUserFaves(); //call immediately so app can track changes and respond if the view changes to faves on either click or login of existing user

    $scope.deleteUserFaves=(videoId)=>{
        console.log ("deleteUserFavesfired");
        //video id of video passed in on click
        console.log ("videoId", videoId);
        let currentUser = UserFactory.getUser();
        UserFactory.userCheck(currentUser)
        .then((userObj)=>{
            console.log ("userObjinsidedelete",userObj);
            let userKey= Object.keys(userObj);
            console.log ("userKeyinsidedelete",userKey);

            let favesArr= userObj[userKey].faves;
            // //store values of faves in array

            console.log ("favesArr", favesArr);
            //delete object we need to get rid of based on video id, but save the rest in an array

            let savedFavesArr= favesArr.filter(function(obj){
                return obj.video_id!== videoId;
            });//want it to return all the objects that don't have that videoId
            console.log ("savedFavesArr",savedFavesArr);
            userObj[userKey].faves = savedFavesArr;
             //reassign value to object

             console.log ("userObjwithsaved", userObj);

            UserFactory.patchUpdatedUserOnFB(userObj[userKey],userKey)
            .then((deletedFaves)=>{
                console.log ("deletedFaves",deletedFaves);
                getUserFaves();
            });
            //patch that obj back onto FB



            // let faveVidArr = userObj[userKey].faves.reduce(function(prev,curr){
            //     return curr.video_id === videoId ? curr:prev;}, null);
            // console.log ("vidObjtodelete", vidObjToDelete);


         });
        //get user object, go to faves array, find the object that contains that id, and delete it from the user object in FB


    };
});

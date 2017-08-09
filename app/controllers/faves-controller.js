'use strict';
latinApp.controller("FavesController", function($scope, $window, UserFactory, VideoFactory){

//how to add property of faves [] to user object in firebase if it doesn't exist
//how to add to that array?
//how to do a patch?
    $scope.postVideoToUserFaves=(videoId, topicId)=>{//fires on click of add to favorites button on video
        console.log ("postvideofaves fired");
        console.log ("event", videoId);
        console.log ("topicId",topicId);
        VideoFactory.getOneTopic(topicId)
        .then((topic)=>{
            //reduce that topic object to just the video object that matches the id of the card clicked
            console.log ("topic in postVideoToUserFaves", topic);
            let vidObj = topic[0].videos.reduce(function(prev,curr){
                return curr.video_id === videoId ? curr:prev;}, null);
            console.log ("result", vidObj);
            //getUser, get user obj

            //userObj.faves = [vidObj]?

            //put that back on fb to replace old user object

            //put that videoObject on userObject in FB - if no faves property exists, add property and push obj into that array else just push object into faves array
        });
    };


});

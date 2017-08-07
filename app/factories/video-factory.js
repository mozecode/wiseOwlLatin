'use strict';

latinApp.factory("VideoFactory", function($q, $http, FirebaseUrl){

//actions needed
    let getOneTopic = (topicId) =>{
        return $q((resolve, reject)=>{
            $http.get(`${FirebaseUrl}topics/${topicId}.json`)
            .then((topicData)=>{
                resolve(topicData.data);
            })
            .catch((err)=>{
                console.log("couldn't get topic");
                reject(err);
            });
        });
    };

//get user's favorite videos in a list.  Need uid and fave topic ids


    return{getOneTopic};
});
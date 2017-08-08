'use strict';

latinApp.factory("VideoFactory", function($q, $http, FirebaseUrl){
let topicData ={};
//actions needed
    let getOneTopic = (topicId) =>{
        console.log ("inFactorytopicId", topicId);
        return $q((resolve, reject)=>{
            $http.get(`${FirebaseUrl}topics.json?orderBy="topic_id"&equalTo="${topicId}"`)
            .then((data)=>{
                //save object into a variable
                console.log ("topicData",data.data);
                topicData=data.data;
                resolve(data.data);
            })
            .catch((err)=>{
                console.log("couldn't get topic");
                reject(err);
            });
        });
    };

    let getTopicData =()=>{
        console.log ("topicData",topicData);
        return topicData;
    }; //return it for use in a different scope

    return{getOneTopic, getTopicData};
});
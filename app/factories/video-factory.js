'use strict';

latinApp.factory("VideoFactory", function($q, $http, FirebaseUrl){
    let topicData ={};
    //actions needed
    let getOneTopic = (topicId) =>{
        return $q((resolve, reject)=>{
            $http.get(`${FirebaseUrl}topics.json?orderBy="topic_id"&equalTo="${topicId}"`)
            .then((data)=>{
                //save object into a variable
                topicData=data.data; //pass this using function below: getTopicData
                resolve(data.data);
            })
            .catch((err)=>{
                reject(err);
            });
        });
    };

    let getTopicData =()=>{
        return topicData;
    }; //return it for use in a different scope

    return{getOneTopic, getTopicData};
});
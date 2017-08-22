'use strict';

latinApp.controller("TopicController",function($scope, $window,$routeParams, UserFactory, VideoFactory){

    $scope.isAuth =()=> new Promise((resolve, reject)=>{
         if(UserFactory.isAuthenticated()){
            resolve();
        } else {
            reject();
        }
    });

    $scope.getTopic=(event)=>{
        //get id of the nav link clicked
        let topId = event.target.id;
        VideoFactory.getOneTopic(topId)
        .then((topic)=>{
            $scope.topic = topic;
            for(var key in topic){
                $window.location.href = `#!/view/${key}`;
            }
        })
        .catch((err)=>{
            console.log ("sorry, no topic returned",err);
        });
    };
});
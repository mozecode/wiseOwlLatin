'use strict';

latinApp.controller("TopicController",function($scope, $window,$routeParams, UserFactory, VideoFactory){


 $scope.isAuth =()=> new Promise((resolve, reject)=>{
         if(UserFactory.isAuthenticated()){
             console.log("User is authenticated, resolve route promise");
            resolve();
        } else {
         console.log("User is not authenticated, reject route promise");
        reject();
        }
    });

//get topic that user clicks on in navbar -- communication between controllers using $routeParams
$scope.getTopic=(event)=>{
    console.log ("event",event.target.id);//get id of the nav link clicked, which is the
    let topId = event.target.id;
    console.log ("getTopic");
        VideoFactory.getOneTopic(topId)
        .then((topic)=>{
            console.log ("topic",topic);
            $scope.topic = topic;
            console.log ("scope.topic[0]", $scope.topic[0]);
            for(var key in topic){
                console.log ("key",`#!/${key}`);
                $window.location.href = `#!/view/${key}`;
            }
        })
        .catch((err)=>{
            console.log ("sorry, no topic returned",err);
        });
    };

});
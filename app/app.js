'use strict';

let latinApp = angular.module("LatinApp", ["ngRoute","anguvideo"])
.constant("FirebaseUrl", "https://wiseowllatin.firebaseio.com/");
//don't forget the slash at the end of the url

let isAuth = (UserFactory)=>{
    return new Promise((resolve, reject)=>{
        UserFactory.isAuthenticated()
        .then((user)=>{
            if (user){
                resolve();
            }else{
                reject();
            }
        });
    });
};//if there's a logged in user, resolve, otherwise reject

// route configuration
latinApp.config(($routeProvider)=>{
    $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller:'UserController'
    })
    .when('/newUser',{
        templateUrl:'partials/newUser.html',
        controller:'NewUserController',
        resolve:{isAuth}
    })
    .when('/chooseUsername',{
        templateUrl:'partials/chooseUsername.html',
        controller:'UsernameChoiceController',
        resolve:{isAuth}
    })
    .when('/chooseAvatar',{
        templateUrl:'partials/chooseAvatar.html',
        controller:'AvatarChoiceController',
        resolve:{isAuth}
    })
    .when('/view/:topic_id',{
        templateUrl:'partials/topics.html',
        controller:'VideoController',
        resolve:{isAuth}
    })
    .when('/faves', {
        templateUrl: 'partials/faves.html',
        controller:'FavesController',
        resolve:{isAuth}
    })
    .otherwise('/');
});
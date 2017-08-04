'use strict';

let latinApp = angular.module("LatinApp", ["ngRoute"])
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

//route configuration
// latinApp.config(($routeProvider)=>{
//     $routeProvider
//     .when('/', {
//         templateUrl: 'partials/login.html',
//         controller:'UserController'
//     })

// });
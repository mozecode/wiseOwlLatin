'use strict';

latinApp.factory("UserFactory", function($q, $http, FirebaseUrl, FBCreds){

    var config ={
        apiKey: FBCreds.key,
        authDomain:FBCreds.authDomain
    };

    firebase.initializeApp(config);

    let currentUser = null;

    let isAuthenticated = function(){
        return new Promise ((resolve, reject)=>{
            console.log ("onAuthStateChanged fired");
            firebase.auth().onAuthStateChanged(function(user){
                console.log ("onAuthStateChanged done");
                if (user){
                    console.log ("user", user);
                    currentUser= user.uid;
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        });
    };

    let getUser =()=>{
        return currentUser;
    };//returns logged in user's uid

    //need a check to see if user exists already in FB
    let userCheck = (userId)=>{
    console.log ("userId",userId);
    return $q((resolve, reject)=>{
            $http.get(`${FirebaseUrl}users.json?orderBy="uid"&equalTo="${userId}"`)
            .then((existingUserData)=>{
                resolve (existingUserData.data);
                console.log ("existingUserData",existingUserData.data);
            })
            .catch((err)=>{
                console.log ("nope", err);
                reject(err);
            });
        });
    };

    let postUserToFB = (userObj)=>{
        //post new user object to firebase
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}users.json`,
            angular.toJson(userObj))
            .then( (newUserData) => {
                console.log ("new user", newUserData);
                 resolve(newUserData);
            })
            .catch( (err) => {
                reject(err);
            });
        });

    };

    let patchUpdatedUserOnFB =(vidObj, fbkey)=>{
        return $q((resolve, reject)=>{
            if (fbkey){
                $http.patch(`${FirebaseUrl}users/${fbkey}.json`,
                    angular.toJson(vidObj))
                .then((data)=>{
                    resolve(data);
                })
                .catch((err)=>{
                    reject(err);
                });
            } else{
                console.log ("no dice");
            }
        });
    };

    // let deleteVideo = (vidId)=>{
    //     return $q( (resolve, reject) => {
    //   if (vidId) {
    //     $http.delete(`${FirebaseUrl}users/${userKey}/faves/${vidId}.json`)
    //     .then( (data) => {
    //       resolve(data);
    //     })
    //     .catch( (err) => {
    //       reject(err);
    //     });
    //   } else {
    //     console.log("No id passed in");
    //   }
    // });
    // };

    let loginUser =()=>{
        return $q((resolve, reject)=>{
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then((user)=>{
                currentUser = user.uid;
                resolve(user);
            })
            .catch((err)=>{
                reject (err);
            });
        });
    };

    let logoutUser =()=>{
        return firebase.auth().signOut()
        .catch((err)=>{
            console.log("error logging out", err.message);
        });
    };

    return {isAuthenticated, userCheck, postUserToFB, patchUpdatedUserOnFB,getUser, loginUser, logoutUser};
});
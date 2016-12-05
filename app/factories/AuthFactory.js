"use strict";

app.factory("AuthFactory", ()=>{

    // {                es6 adding functions to object shorthand
    //  createUser(){

    //  },
    // }

    let currentUser = null;

    let AuthFactory = {};


    AuthFactory.createUser = (userObj)=>{
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);
    };

    AuthFactory.loginUser = (userObj)=>{
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
    };

    AuthFactory.logoutUser = ()=>{
        return firebase.auth().signOut();
    };

    AuthFactory.isAuthenticated = ()=>{
        return new Promise((resolve,reject)=>{
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    currentUser = user.uid;
                    // console.log("currentUser", currentUser);
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        });
    };

    AuthFactory.getUser = ()=>{
        return currentUser;
    };

    return AuthFactory;


});
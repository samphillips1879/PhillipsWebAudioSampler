"use strict";

app.factory("AuthFactory", ()=>{

    let currentUser = "anonymous",
        AuthFactory = {};

    AuthFactory.registered = false;

    AuthFactory.createUser = (userObj)=>{
        console.log("trying to create user");
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);
    };

    AuthFactory.loginUser = (userObj)=>{
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
    };

    AuthFactory.logoutUser = ()=>{
        currentUser = "anonymous";
        AuthFactory.registered = false;
        return firebase.auth().signOut();
    };

    AuthFactory.isAuthenticated = ()=>{
        // console.log("running isAuthenticated");
        return new Promise((resolve,reject)=>{
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    // console.log("user from if in isAuth", user);
                    currentUser = user.uid;
                    AuthFactory.registered = true;
                    // console.log("currentUser", currentUser);
                    resolve(true);
                }else{
                    currentUser = "anonymous";
                    AuthFactory.registered = false;
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
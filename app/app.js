"use strict";

//establishing angular app
let app = angular.module("WebSamplerApp", ["ngRoute"]);


let isAuth = (AuthFactory)=> new Promise((resolve,reject)=>{
    AuthFactory.isAuthenticated()
    .then((userExists)=>{
        if (userExists) {
            resolve();
        } else {
            reject();
        }
    });
});



app.config(($routeProvider)=>{
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    })
    // .when('/items/:itemId', {
    //     templateUrl: 'partials/item-details.html',
    //     controller: 'ItemViewCtrl',
    //     resolve: {isAuth}
    // })
    .otherwise('/login');
});




app.run(($location, FBCreds)=>{
    let authConfig = {
        apiKey: FBCreds.key,
        authDomain: FBCreds.authDomain
    };
    firebase.initializeApp(authConfig);
});


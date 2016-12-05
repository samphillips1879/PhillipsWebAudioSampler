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




// app.config(($routeProvider)=>{
//     $routeProvider
//     .when('/items/list', {
//         templateUrl: 'partials/item-list.html',
//         controller: 'ItemListCtrl',
//         resolve: {isAuth}
//     })
//     .when('/items/:itemId', {
//         templateUrl: 'partials/item-details.html',
//         controller: 'ItemViewCtrl',
//         resolve: {isAuth}
//     })
//     .otherwise('/items/list');
// });




app.run(($location, FBCreds)=>{
    let authConfig = {
        apiKey: FBCreds.key,
        authDomain: FBCreds.authDomain
    };
    firebase.initializeApp(authConfig);
});


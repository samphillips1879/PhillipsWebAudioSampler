"use strict";

//establishing angular app
let app = angular.module("WebSamplerApp", ["ngRoute", "ngSanitize"]);

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
    .when('/logout', {
        templateUrl: 'partials/logout.html',
        controller: 'LogoutCtrl',
        resolve: {isAuth}
    })
    .when('/play', {
        templateUrl: 'partials/play.html',
        controller: 'PlayCtrl',
        resolve: {isAuth}
    })
    .when('/samples/create', {
        templateUrl: 'partials/createSamples.html',
        controller: 'CreateSamplesCtrl',
        resolve: {isAuth}
    })
    .when('/samples/browse', {
        templateUrl: 'partials/assignSamples.html',
        controller: 'AssignSamplesCtrl',
        resolve: {isAuth}
    })
    .when('/patches', {
        templateUrl: 'partials/patches.html',
        controller: 'PatchesCtrl',
        resolve: {isAuth}
    })
    .otherwise('/login');
});

app.run(($location, FBCreds)=>{
    let authConfig = {
        apiKey: FBCreds.key,
        authDomain: FBCreds.authDomain,
        storageBucket: FBCreds.storageBucket
    };
    firebase.initializeApp(authConfig);
});

//creating the audio context
const AUD_CTX = new window.AudioContext();
	//including webkit version, because jshint didn't like it but I want to save it to try and get to work later
	// const AUD_CTX = new (window.AudioContext || window.webkitAudioContext)();
// ************************




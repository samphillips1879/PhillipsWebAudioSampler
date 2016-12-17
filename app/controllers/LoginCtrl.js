"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window){
	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = ()=>{
		AuthFactory.createUser($scope.account)
		.then((userData)=>{
			$scope.login();
		});
	};


	$scope.login = ()=>{
		AuthFactory.loginUser($scope.account)
		.then((user)=>{
			$window.location.href = "#/play";
			AuthFactory.isAuthenticated() //THIS SHOULD BE UNNECESSARY, WAS JUST INCLUDED FOR MY SAKE IN SEEING IF getUser() WAS WORKING
			.then(()=>{
				console.log("AuthFactory.getUser()", AuthFactory.getUser());
			});
		});
	};
});
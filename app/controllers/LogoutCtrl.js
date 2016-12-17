"use strict";
app.controller('LogoutCtrl', function($scope, $window, AuthFactory){
	numBind = false;
	$scope.greeting = "You are being logged out";
	AuthFactory.logoutUser()
	.then(()=>{
		$window.location.href = "#/login";
		console.log("current user", AuthFactory.getUser());
	});
});
"use strict";
app.controller('NavCtrl', function($scope, AuthFactory){

	// $scope.user = AuthFactory.getUser();

	$scope.navItems = [
		{name: "Logout", url: "#/logout"}, 
		{name: "Create Samples", url: "#/samples/create"},
		{name: "Browse Samples", url: "#/samples/browse"},
		{name: "Patches", url: "#/patches"},
		{name: "Play", url:"#/play"} 
	];
	$scope.guestNavItems = [
		{name: "login/register", url: "#/login"},
	];
});
"use strict";
app.controller('NavCtrl', function($scope, AuthFactory){
	// $scope.searchText = SearchTerms;

	// console.log("AuthFactory.isAuthenticated", AuthFactory.isAuthenticated());

		// console.log("authenticated");




	$scope.navItems = [
		{name: "Logout", url: "#/logout"}, 
		{name: "Play", url:"#/play"}, 
		{name: "Create Samples", url: "#/samples/create"},
		{name: "Assign Samples", url: "#/samples/assign"},
		{name: "Patches", url: "#/patches"}
	];
	$scope.guestNavItems = [
		{name: "login/register", url: "#/login"},
	];
});
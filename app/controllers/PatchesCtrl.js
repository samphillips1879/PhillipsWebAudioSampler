"use strict";
app.controller('PatchesCtrl', function($scope, Database, AuthFactory){
	$scope.greeting = "Pick a Patch to Play With";



	$scope.getPatches = (limitTo)=>{
		if (limitTo === "public") {
			console.log("browsing public patches");
			Database.getPublicPatches()
			.then((catCards)=>{
				$scope.catalog = catCards;
				$scope.$apply();
			});
		} else if (limitTo === "user") {
			let user = AuthFactory.getUser();
			console.log("browsing samples made by user: ", user);
			Database.getUserPatches(user)
			.then((catCards)=>{
				$scope.catalog = catCards;
				$scope.$apply();
			});
		}
	};


	$scope.assignPatch = (patch)=>{
		console.log("assigning patch initialized");	

	};













});


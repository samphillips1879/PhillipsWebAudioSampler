"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce){
	$scope.greeting = "Create Samples Controller Connected";

	// $scope.youtube = null;

	$scope.inputURL = `<iframe width="560" height="315" src="https://www.youtube.com/embed/RDrfE9I8_hs?rel=0" frameborder="0" allowfullscreen></iframe>`;
	$scope.iframeYoutube = $sce.trustAsHtml(`${$scope.inputURL}`);
	console.log("$scope.iframeYoutube", $scope.iframeYoutube);
});
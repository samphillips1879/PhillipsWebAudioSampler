"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce){
	$scope.greeting = "Create Samples Controller Connected";

	// $scope.youtube = null;

	$scope.inputURL = ``;
	console.log("$scope.iframeYoutube", $scope.iframeYoutube);


	$scope.grabYoutubeVideo = ()=>{
		$scope.iframeYoutube = $sce.trustAsHtml(`${$scope.inputURL}`);
		$scope.inputURL = ``;


		// connect mediaElementSourceNode to the video element, of which there should only be one
	};
});
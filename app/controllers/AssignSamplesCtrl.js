"use strict";
app.controller('AssignSamplesCtrl', function($scope, Database, PatchFactory, AuthFactory){
	$scope.greeting = "Assign Samples Controller Connected";



	let arrayBuffer = null;
	let bufferToBeAssigned = null;



	$scope.sampleTitleQuery = "";


//sample retrieval logic
//****************************************************

	$scope.getSampleCards = (limitTo)=>{
		if (limitTo === "public") {
			console.log("browsing public samples");
			Database.getPublicSampleCatalogCards();
		} else if (limitTo === "user") {
			let user = AuthFactory.getUser();
			console.log("browsing samples made by user: ", user);
			Database.getUserSampleCatalogCards(user);
		}
	};














	$scope.getSampleWav = ()=>{
		Database.downloadSampleWav($scope.sampleTitleQuery);
		// $scope.decodeSample(); 
	};

//want this to be triggered through a ".then()" attached to Database.downloadSampleWav, but for now I'll tie it to a button in the dom because that function does not yet return a promise
	$scope.decodeSample = ()=>{
		let blob = Database.retrieveBlob();
		console.log("blob about to be decoded", blob);
		let reader = new FileReader();
		reader.readAsArrayBuffer(blob);
		reader.onload = (e)=>{
			// console.log("e.target.result", e.target.result);
			arrayBuffer = e.target.result;
			AUD_CTX.decodeAudioData(arrayBuffer).then(function(decodedData) {
				bufferToBeAssigned = decodedData;
				console.log("blob decoded");
			});
		};
	};

	$scope.playSample = ()=>{
		let sampleSourceNode = AUD_CTX.createBufferSource();
		sampleSourceNode.buffer = bufferToBeAssigned;
		sampleSourceNode.connect(AUD_CTX.destination);
	    sampleSourceNode.start(0);
	};
//****************************************************









//sample assignment logic
//****************************************************

	$scope.channelSelect = null;

	$scope.assignSample = ()=>{
		if ($scope.channelSelect) {
			PatchFactory.currentPatch.channels[$scope.channelSelect].sampleBuffer = bufferToBeAssigned;
		}
		console.log(`PatchFactory.currentPatch.channels[${$scope.channelSelect}]`, PatchFactory.currentPatch.channels[$scope.channelSelect]);
		console.log("PatchFactory.currentPatch", PatchFactory.currentPatch);
	};














//****************************************************



});
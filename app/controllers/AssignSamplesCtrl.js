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
			Database.getPublicSampleCatalogCards()
			.then((catCards)=>{
				$scope.catalog = catCards;
				$scope.$apply();
			});
		} else if (limitTo === "user") {
			let user = AuthFactory.getUser();
			console.log("browsing samples made by user: ", user);
			Database.getUserSampleCatalogCards(user)
			.then((catCards)=>{
				$scope.catalog = catCards;
				$scope.$apply();
			});
		}
	};

	$scope.getSample = (user, wavName)=>{
		Database.getWavURL(user, wavName)
		.then((wavURL)=>{
			Database.downloadWav(wavURL)
			.then((wav)=>{
				console.log("got wav here in AssignSamplesCtrl", wav);
				let reader = new FileReader();
				reader.onload = (e)=>{
					// console.log("e.target.result", e.target.result);
					arrayBuffer = e.target.result;
					AUD_CTX.decodeAudioData(arrayBuffer).then(function(decodedData) {
						bufferToBeAssigned = decodedData;
						console.log("blob decoded");
					});
				};
				reader.readAsArrayBuffer(wav);
			});
		});
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
			// PatchFactory.currentPatch.channels[$scope.channelSelect].img = 

		}
		console.log(`PatchFactory.currentPatch.channels[${$scope.channelSelect}]`, PatchFactory.currentPatch.channels[$scope.channelSelect]);
		console.log("PatchFactory.currentPatch", PatchFactory.currentPatch);
	};

//****************************************************

});
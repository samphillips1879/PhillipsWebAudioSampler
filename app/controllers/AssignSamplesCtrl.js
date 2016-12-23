"use strict";
app.controller('AssignSamplesCtrl', function($scope, Database, PatchFactory, AuthFactory, SampleFactory){
	$scope.greeting = "Assign Samples to Your Current Patch";
	let arrayBuffer = null;
	let bufferToBeAssigned = null;
	let titleToBeAssigned = null;
	let imageToBeAssigned = null;
	$scope.sampleTitleQuery = "";
	$scope.sampleLoaded = false;


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

	$scope.fillAssignmentVariables = (title, img)=>{
		console.log("filling assignment variables");
		titleToBeAssigned = title;
		imageToBeAssigned = img;
		console.log("titleToBeAssigned", titleToBeAssigned);
		console.log("imageToBeAssigned", imageToBeAssigned);
	};

	$scope.getSample = (user, wavName)=>{
		$scope.sampleLoaded = false;
		Database.getWavURL(user, wavName)
		.then((wavURL)=>{
			Database.downloadWav(wavURL)
			.then((wav)=>{
				console.log("got wav here in AssignSamplesCtrl", wav);
				let reader = new FileReader();
				reader.onload = (e)=>{
					// console.log("e.target.result", e.target.result);
					arrayBuffer = e.target.result;
					AUD_CTX.decodeAudioData(arrayBuffer).then((decodedData)=> {
						bufferToBeAssigned = decodedData;
						console.log("blob decoded");
						$scope.sampleLoaded = true;
						$scope.$apply();
						// console.log("tried to set ", );
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





// SampleFactory playback version
	$scope.channelSelect = null;

	$scope.assignSample = ()=>{
		if ($scope.channelSelect) {
			let chan = SampleFactory.channels[$scope.channelSelect];
			
			chan.sampleBuffer = bufferToBeAssigned;
			chan.sampleTitle = titleToBeAssigned;

			// PatchFactory.currentPatch.channels[$scope.channelSelect].sampleBuffer = bufferToBeAssigned;
			// PatchFactory.currentPatch.channels[$scope.channelSelect].img = 



		}
		console.log(`SampleFactory.channels[${$scope.channelSelect}]`, SampleFactory.channels[$scope.channelSelect]);
		console.log("PatchFactory.currentPatch", PatchFactory.currentPatch);
	};
















// currentPatch playback version
	// $scope.channelSelect = null;

	// $scope.assignSample = ()=>{
	// 	if ($scope.channelSelect) {
	// 		let chan = PatchFactory.currentPatch.channels[$scope.channelSelect];
			
	// 		chan.sampleBuffer = bufferToBeAssigned;
	// 		chan.sampleTitle = titleToBeAssigned;

	// 		// PatchFactory.currentPatch.channels[$scope.channelSelect].sampleBuffer = bufferToBeAssigned;
	// 		// PatchFactory.currentPatch.channels[$scope.channelSelect].img = 



	// 	}
	// 	console.log(`PatchFactory.currentPatch.channels[${$scope.channelSelect}]`, PatchFactory.currentPatch.channels[$scope.channelSelect]);
	// 	console.log("PatchFactory.currentPatch", PatchFactory.currentPatch);
	// };
//****************************************************

});
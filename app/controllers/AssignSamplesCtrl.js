"use strict";
app.controller('AssignSamplesCtrl', function($scope, Database, PatchFactory, AuthFactory, SampleFactory){
	$scope.greeting = "Sample Selection";
	let arrayBuffer = null,
	bufferToBeAssigned = null,
	titleToBeAssigned = null,
	imageToBeAssigned = null,
	authorToBeAssigned = null,
	wavNameToBeAssigned = null;
	$scope.sampleTitleQuery = "";
	$scope.sampleLoaded = false;
	$scope.sampleBeltMessage = "Please Load a Sample";
	$scope.currentSampleTitle = "";


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

	$scope.fillAssignmentVariables = (title, img, author, wavName)=>{
		console.log("filling assignment variables");
		titleToBeAssigned = title;
		imageToBeAssigned = img;
		authorToBeAssigned = author;
		wavNameToBeAssigned = wavName;
		$scope.currentSampleTitle = `"${title}"`;
		console.log("titleToBeAssigned", titleToBeAssigned);
		console.log("imageToBeAssigned", imageToBeAssigned);
		console.log("wavNameToBeAssigned", wavNameToBeAssigned);
		console.log("authorToBeAssigned", authorToBeAssigned);
	};

	$scope.getSample = (user, wavName)=>{
		$scope.sampleBeltMessage = "Loading Sample...";
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
	$scope.channelSelect = "Load to Channel: ";
	// $scope.channelSelect = null;

	$scope.assignSample = ()=>{
		if ($scope.channelSelect !== "Load to Channel: ") {
			let chan = SampleFactory.channels[$scope.channelSelect];
			
			chan.sampleBuffer = bufferToBeAssigned;
			chan.sampleTitle = titleToBeAssigned;

			let patchChannel = PatchFactory.currentPatch.channels[$scope.channelSelect];
			patchChannel.sampleWavName = wavNameToBeAssigned;
			patchChannel.sampleAuthor = authorToBeAssigned;
			console.log("titleToBeAssigned", titleToBeAssigned);
			patchChannel.sampleTitle = titleToBeAssigned;

			

		}
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
"use strict";
app.controller('AssignSamplesCtrl', function($scope, Database, PatchFactory, AuthFactory, SampleFactory){
	$scope.greeting = "Sample Selection";
	$scope.channelSelect = "Load to Channel: ";
	$scope.sampleTitleQuery = "";
	$scope.sampleLoaded = false;
	$scope.sampleBeltMessage = "Please Load a Sample";
	$scope.currentSampleTitle = "";

	let arrayBuffer = null,
	bufferToBeAssigned = null,
	titleToBeAssigned = null,
	imageToBeAssigned = null,
	authorToBeAssigned = null,
	wavNameToBeAssigned = null;

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
					arrayBuffer = e.target.result;
					AUD_CTX.decodeAudioData(arrayBuffer).then((decodedData)=> {
						bufferToBeAssigned = decodedData;
						console.log("blob decoded");
						$scope.sampleLoaded = true;
						$scope.$apply();
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

	$scope.assignSample = ()=>{
		if ($scope.channelSelect !== "Load to Channel: ") {
			let chan = SampleFactory.channels[$scope.channelSelect];
			
			chan.sampleBuffer = bufferToBeAssigned;
			chan.sampleTitle = titleToBeAssigned;

			let patchChannel = PatchFactory.currentPatch.channels[$scope.channelSelect];
			patchChannel.sampleWavName = wavNameToBeAssigned;
			patchChannel.sampleAuthor = authorToBeAssigned;
			// console.log("titleToBeAssigned", titleToBeAssigned);
			patchChannel.sampleTitle = titleToBeAssigned;
		}
	};
});
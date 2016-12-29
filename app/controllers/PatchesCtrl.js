"use strict";
app.controller('PatchesCtrl', function($scope, $window, Database, AuthFactory, PatchFactory, SampleFactory){
	$scope.greeting = "Pick-a-Patch";

	let arrayBuffer = null;



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
		PatchFactory.currentPatch = patch;
		$scope.loadSamples();
	};




	$scope.loadSamples = ()=>{
		//an attempt to wait to switch views until the last sample has been loaded
		let counter = 0;

		PatchFactory.currentPatch.channels.forEach((value, index)=>{
			console.log("loading sample for channel", index);
			console.log("loading sample", value);





			if (value.sampleAuthor && value.sampleWavName) {





				Database.getWavURL(value.sampleAuthor, value.sampleWavName)
				.then((wavURL)=>{
					console.log("got wavURL", wavURL);
					Database.downloadWav(wavURL)
					.then((wav)=>{
						console.log("got wav here in PatchesCtrl", wav);
						let reader = new FileReader();
						reader.onload = (e)=>{
							// console.log("e.target.result", e.target.result);
							arrayBuffer = e.target.result;
							AUD_CTX.decodeAudioData(arrayBuffer).then((decodedData)=> {
								SampleFactory.channels[index].sampleBuffer = decodedData;
								console.log("blob decoded");
								// $scope.sampleLoaded = true;
								$scope.$apply();
								console.log("loaded sample at channel: ", index);
								console.log("PatchFactory.currentPatch", PatchFactory.currentPatch);
								console.log("SampleFactory", SampleFactory);
								$scope.$apply();

								counter++;
								if (counter === 8) {
									$window.location.href = "#/play";
								}
								// console.log("tried to set ", );
							});
						};
						reader.readAsArrayBuffer(wav);
					});
				});
				
			} else {
				SampleFactory.channels[index].sampleBuffer = null;
				counter ++;
				if (counter === 8) {
					$window.location.href = "#/play";
				}
			}

















			// SampleFactory.channels[index].sample
		});
		// $window.location.href = "#/play";
	};








});


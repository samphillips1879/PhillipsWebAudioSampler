"use strict";
app.controller("PlayCtrl", function($scope, AuthFactory, PatchFactory, SampleFactory, Database){
	$scope.greeting = "Make Some Music";
	let chan = null,
		patchTitle = null;


	$scope.savingPatch = false;
	$scope.patchTitle = "";




	$scope.savePatch = ()=>{
		$scope.savingPatch = true;
		// $("#patchTitleInput")[0].focus();
		// console.log($("#patchTitleInput"));
		// PatchFactory.currentPatch.author = AuthFactory.getUser();
		
	};

	$scope.confirmSavePatch = ()=>{
		patchTitle = $scope.patchTitle;
		if (patchTitle) {
			PatchFactory.currentPatch.author = AuthFactory.getUser();
			PatchFactory.currentPatch.title = patchTitle;
			let patch = PatchFactory.currentPatch;
			console.log("currentPatch = ", patch);
			console.log("saving current patch");
			// console.log("saving patch with title: ", patchTitle);
			Database.postNewPatch(patch)
			.then((returned)=>{
				console.log("returned", returned);
			});
			$scope.savingPatch = false;
			$scope.patchTitle = "";
		} else {
			window.alert("please input a title for this patch");
		}
	};

	$scope.cancelSavePatch = ()=>{
		$scope.savingPatch = false;
		$scope.patchTitle = "";
	};


	let showButtonPress = (channelNum)=>{
		$(".glyphicon-play").eq(channelNum).addClass("active");
		// .active (and include the aria-pressed="true" attribute) 
	};

	let showButtonRelease = (channelNum)=>{
		$(".glyphicon-play").eq(channelNum).removeClass("active");
	};





	// Binding number keys to sample triggers
	$(document).keydown((e)=>{
		// console.log("key pressed", e.key);
		let keyPressed = e.keyCode;
		if (keyPressed > 47 && keyPressed < 56) {
			if (SampleFactory.channels[e.key].sampleBuffer) {
				showButtonPress(e.key);
				if (keyPressed === 48) {
					$scope.playSample(0); 
				} else if (keyPressed === 49) {
					console.log("1");
					$scope.playSample(1);
				} else if (keyPressed === 50) {
					// console.log("2");
					$scope.playSample(2);
				} else if (keyPressed === 51) {
					// console.log("3");
					$scope.playSample(3);
				} else if (keyPressed === 52) {
					// console.log("4");
					$scope.playSample(4);
				} else if (keyPressed === 53) {
					// console.log("5");
					$scope.playSample(5);
				} else if (keyPressed === 54) {
					// console.log("6");
					$scope.playSample(6);
				} else if (keyPressed === 55) {
					// console.log("7");
					$scope.playSample(7);
				} 
			}

		}
	});




	//
	$(document).keyup((e)=>{
		// console.log("key pressed", e.key);
		let keyPressed = e.keyCode;
		if (keyPressed > 47 && keyPressed < 56) {
			$(".glyphicon-play").eq(e.key).removeClass("active");
		}
	});





	//patch initialization

	$scope.patch = PatchFactory.currentPatch;
	$scope.samples = SampleFactory;


	// console.log("$scope.patch", $scope.patch); //setting the patch to either the default template or whatever the user has saved as their currentPatch
	let patch = $scope.patch; 
	let samples = $scope.samples;
//samples might not be getting used


	//connecting paths
	patch.channels.forEach((channel, channelNumber)=>{
		//create those nodes, homeskillet
		channel.gain = AUD_CTX.createGain();
		channel.gain.gain.value = channel.gainValue;
		// connect them paths, yo
		channel.gain.connect(AUD_CTX.destination);
	});

	$scope.playSample = (channelNumber)=>{
		console.log(`playing sample at chan ${channelNumber}`);
		chan = SampleFactory.channels[channelNumber];
	 	if(chan.sampleSource){
	 		chan.sampleSource.stop();
	 		chan.sampleSource = null;
	 	}
	 	chan.sampleSource = AUD_CTX.createBufferSource();
	 	chan.sampleSource.buffer = chan.sampleBuffer;
	 	chan.sampleSource.connect(PatchFactory.currentPatch.channels[channelNumber].gain);
	 	chan.sampleSource.start();
	};

	$scope.stopSample = (channelNumber)=>{
		console.log(`stopping sample at chan ${channelNumber}`);
		chan = SampleFactory.channels[channelNumber];
		chan.sampleSource.stop();
		chan.sampleSource = null;
	};

	//to bring in a new patch, set an event that, once triggered, sets $scope.patch to whatever patch is saved in PatchFactory

});
























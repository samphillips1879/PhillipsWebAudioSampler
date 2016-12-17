"use strict";
app.controller("PlayCtrl", function($scope, PatchFactory){
	$scope.greeting = "Make some music";
	let chan = null;





// Binding number keys to sample triggers
	$(document).keydown((e)=>{
		let key = e.keyCode;
		if (key === 48) {
			// console.log("0");
			$scope.playSample(0); 
		} else if (key === 49) {
			// console.log("1");
			$scope.playSample(1);
		} else if (key === 50) {
			// console.log("2");
			$scope.playSample(2);
		} else if (key === 51) {
			// console.log("3");
			$scope.playSample(3);
		} else if (key === 52) {
			// console.log("4");
			$scope.playSample(4);
		} else if (key === 53) {
			// console.log("5");
			$scope.playSample(5);
		} else if (key === 54) {
			// console.log("6");
			$scope.playSample(6);
		} else if (key === 55) {
			// console.log("7");
			$scope.playSample(7);
		}
	});
















//patch initialization
	$scope.patch = PatchFactory.currentPatch;
	// console.log("$scope.patch", $scope.patch); //setting the patch to either the default template or whatever the user has saved as their currentPatch
	let patch = $scope.patch; 

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
		chan = patch.channels[channelNumber];
	 	if(chan.sampleSource){
	 		chan.sampleSource.stop();
	 		chan.sampleSource = null;
	 	}
	 	chan.sampleSource = AUD_CTX.createBufferSource();
	 	chan.sampleSource.buffer = chan.sampleBuffer;
	 	chan.sampleSource.connect(chan.gain);
	 	chan.sampleSource.start();
	};
	$scope.stopSample = (channelNumber)=>{
		console.log(`stopping sample at chan ${channelNumber}`);
		chan = patch.channels[channelNumber];
		chan.sampleSource.stop();
		chan.sampleSource = null;
	};

	//to bring in a new patch, set an event that, once triggered, sets $scope.patch to whatever patch is saved in PatchFactory

});
























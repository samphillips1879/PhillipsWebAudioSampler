"use strict";
app.controller("PlayCtrl", function($scope, PatchFactory){
	$scope.greeting = "Play Controller Connected";
	let chan = null;

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
























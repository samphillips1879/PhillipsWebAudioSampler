"use strict";
app.controller("PlayCtrl", function($scope, PatchSamples, PatchFactory){
	$scope.greeting = "Play Controller Connected";

	console.log("PatchSamples", PatchSamples);

//creating the audio context
	const AUD_CTX = new window.AudioContext();
	//including webkit version, because jshint didn't like it but I want to save it to try and get to work later
	// const AUD_CTX = new (window.AudioContext || window.webkitAudioContext)();


//patch initialization
	$scope.patch = PatchFactory.getCurrentPatch();
	console.log("$scope.patch", $scope.patch); //setting the patch to either the default template or whatever the user has saved as their currentPatch
	let patch = $scope.patch; //this is to normalize the following logic, so that what follows can be stored outside of anything involving $scope
	console.log("patch", patch);

	//connecting paths
	patch.channels.forEach((channel, channelNumber)=>{

		//create those nodes, homeskillet
		channel.gain = AUD_CTX.createGain();
		channel.gain.gain.value = channel.gainValue;
		// console.log(`channel ${channel.channelNum}`, channel);
		
		// connect those paths, yo
		channel.gain.connect(AUD_CTX.destination);

	});




	
	$scope.playOsc = (channelNumber)=>{
		if(patch.channels[channelNumber].sourceOsc){
			patch.channels[channelNumber].sourceOsc.stop();
			patch.channels[channelNumber].sourceOsc = null;
		}
		patch.channels[channelNumber].sourceOsc = AUD_CTX.createOscillator();
		patch.channels[channelNumber].sourceOsc.connect(patch.channels[channelNumber].gain);
		patch.channels[channelNumber].sourceOsc.start();
	};
	$scope.stopOsc = (channelNumber)=>{
		console.log("stopping an osc");
		patch.channels[channelNumber].sourceOsc.stop();
		patch.channels[channelNumber].sourceOsc = null;
	};

	


	//to bring in a new patch, set an event that, once triggered, sets $scope.patch to whatever patch is saved in PatchFactory
























});
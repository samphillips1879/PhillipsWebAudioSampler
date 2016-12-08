"use strict";
app.controller("PlayCtrl", function($scope, PatchSamples, PatchFactory){
	$scope.greeting = "Play Controller Connected";

	console.log("PatchSamples", PatchSamples);

//creating the audio context
	const AUD_CTX = new window.AudioContext();
	//including webkit version, jshint didn't like it
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
		console.log(`channel ${channelNumber}`, channel);
		
		// connect those paths, yo
		channel.gain.connect(AUD_CTX.destination);

	});

//samChannel 0

// start here
	// patch.chan_0 = {};
	// let chan_0 = patch.chan_0; 

	// //nodes
	// chan_0.osc0 = null;
	// chan_0.gain0 = AUD_CTX.createGain();


	// //path(excluding audio source)
	// chan_0.gain0.connect(AUD_CTX.destination);


	// //node values
	// chan_0.gain0.gain.value = 1;
//end here


	//currently, audio doesn't stop if you navigate to a new controller. Want to change that, because otherwise, when you come back to this controller, the audio is still playing from the last time you visited it, but it is no longer connected to user inputs. It's like it's going on in the background
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























	// $scope.patch.chan_0 = {};
	// let patch = 
	// let chan_0 = $scope.patch.chan_0; 

	// //nodes
	// chan_0.osc0 = null;
	// chan_0.gain0 = AUD_CTX.createGain();


	// //path(excluding audio source)
	// chan_0.gain0.connect(AUD_CTX.destination);


	// //node values
	// chan_0.gain0.gain.value = 1;


	// //currently, audio doesn't stop if you navigate to a new controller. Want to change that, because otherwise, when you come back to this controller, the audio is still playing from the last time you visited it, but it is no longer connected to user inputs. It's like it's going on in the background
	// $scope.playOsc0 = ()=>{
	// 	if(chan_0.osc0){
	// 		chan_0.osc0.stop();
	// 	}
	// 	chan_0.osc0 = AUD_CTX.createOscillator();
	// 	chan_0.osc0.connect(chan_0.gain0);
	// 	chan_0.osc0.start();
	// };
	// $scope.stopOsc0 = ()=>{
	// 	chan_0.osc0.stop();
	// 	chan_0.osc0 = null;
	// };

	


	// //to bring in a new patch, set an event that, once triggered, sets $scope.patch to whatever patch is saved in PatchFactory






});
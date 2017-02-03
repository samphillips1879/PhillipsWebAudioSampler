"use strict";
app.controller("PlayCtrl", function($scope, AuthFactory, PatchFactory, SampleFactory, Database){
	$scope.greeting = "Make Some Music";
	$scope.savingPatch = false;
	$scope.patchTitle = "";
	let chan = null,
		patchTitle = null,
		loop = false;

	$scope.savePatch = ()=>{
		$scope.savingPatch = true;
	};

	$scope.confirmSavePatch = ()=>{
		patchTitle = $scope.patchTitle;
		if (patchTitle) {
			PatchFactory.currentPatch.author = AuthFactory.getUser();
			PatchFactory.currentPatch.title = patchTitle;
			let patch = PatchFactory.currentPatch;
			// console.log("currentPatch = ", patch);
			// console.log("saving current patch");
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
	};

	// Binding number keys to sample triggers... this can be dried up
	//dry up using e.key-1
	$(document).keydown((e)=>{
		let playNumber = e.key - 1;
		if (playNumber >= 0 && playNumber <= 7) {
			if (SampleFactory.channels[playNumber].sampleBuffer) {
				showButtonPress(playNumber);
				$scope.playSample(playNumber); 
			}
		}
	});


	// 	$(document).keydown((e)=>{
	// 	let keyPressed = e.keyCode;
	// 	if (keyPressed > 47 && keyPressed < 56) {
	// 		if (SampleFactory.channels[e.key].sampleBuffer) {
	// 			showButtonPress(e.key);
	// 			if (keyPressed === 48) {
	// 				$scope.playSample(0); 
	// 			} else if (keyPressed === 49) {
	// 				console.log("1");
	// 				$scope.playSample(1);
	// 			} else if (keyPressed === 50) {
	// 				$scope.playSample(2);
	// 			} else if (keyPressed === 51) {
	// 				$scope.playSample(3);
	// 			} else if (keyPressed === 52) {
	// 				$scope.playSample(4);
	// 			} else if (keyPressed === 53) {
	// 				$scope.playSample(5);
	// 			} else if (keyPressed === 54) {
	// 				$scope.playSample(6);
	// 			} else if (keyPressed === 55) {
	// 				$scope.playSample(7);
	// 			} 
	// 		}
	// 	}
	// });
	
	// removes "pressed" button appearance after a bound number key is released
	$(document).keyup((e)=>{
		let keyPressed = e.keyCode;
		if (keyPressed > 47 && keyPressed < 56) {
			$(".glyphicon-play").eq(e.key - 1).removeClass("active");
		}
	});

	// 	$(document).keyup((e)=>{
	// 	let keyPressed = e.keyCode;
	// 	if (keyPressed > 47 && keyPressed < 56) {
	// 		$(".glyphicon-play").eq(e.key).removeClass("active");
	// 	}
	// });

	//patch initialization
	$scope.patch = PatchFactory.currentPatch;
	$scope.samples = SampleFactory;
	let patch = $scope.patch; 
	let samples = $scope.samples;
//samples might not be getting used

	//connecting channel paths
	patch.channels.forEach((channel, channelNumber)=>{
		//creating audio nodes
		channel.hiPassFilter = AUD_CTX.createBiquadFilter();
		channel.hiPassFilter.type = 'highpass';
		channel.hiPassFilter.frequency.value = channel.hiPassHz;
		channel.loPassFilter = AUD_CTX.createBiquadFilter();
		channel.loPassFilter.type = 'lowpass';
		channel.loPassFilter.frequency.value = channel.loPassHz;
		channel.gain = AUD_CTX.createGain();
		channel.gain.gain.value = channel.gainValue;
		//connecting audio pathways
		channel.hiPassFilter.connect(channel.loPassFilter);
		channel.loPassFilter.connect(channel.gain);
		channel.gain.connect(AUD_CTX.destination);
	});

	$scope.playSample = (channelNumber)=>{
		loop = patch.channels[channelNumber].loopSample;
		chan = SampleFactory.channels[channelNumber];
	 	if(chan.sampleSource){
	 		chan.sampleSource.stop();
	 		chan.sampleSource = null;
	 	}
	 	chan.sampleSource = AUD_CTX.createBufferSource();
	 	chan.sampleSource.buffer = chan.sampleBuffer;

	 	let startingPlaybackRate = PatchFactory.currentPatch.channels[channelNumber].samplePlaybackRate;

	 	if (startingPlaybackRate) {
		 	chan.sampleSource.playbackRate.value = startingPlaybackRate;
	 	}

	 	chan.sampleSource.connect(PatchFactory.currentPatch.channels[channelNumber].hiPassFilter);
	 	// chan.sampleSource.loop = true;
	 	chan.sampleSource.start();
	 	if (loop) {
	 		chan.sampleSource.loop = true;
	 	} else if (!loop){
	 	}
	};

	$scope.stopSample = (channelNumber)=>{
		// console.log(`stopping sample at chan ${channelNumber}`);
		chan = SampleFactory.channels[channelNumber];
		chan.sampleSource.stop();
		chan.sampleSource = null;
	};

	//currently assumes all patches you are bringing in do not have any looped samples. Will still work if the sample DOES, however the INITIAL colorization of the buttons will be reversed
	$scope.toggleLoop = (channelNumber)=>{
		let chan = patch.channels[channelNumber];
		let samp = SampleFactory.channels[channelNumber];
		if (!chan.loopSample) {
			// updates the channel's loop setting in the patch factory
			chan.loopSample = true;
			$(".glyphicon-retweet").eq(channelNumber).addClass("engagedLoop");
			// if a the channel is currently playing a sample, toggles that sample's loop setting
			if (samp.sampleSource) {
				samp.sampleSource.loop = true;
			}
		} else {
			chan.loopSample = false;
			$(".glyphicon-retweet").eq(channelNumber).removeClass("engagedLoop");
			if (samp.sampleSource) {
				samp.sampleSource.loop = false;
			}
		}
	};

	// binds each channel's effects sliders to their relative effects nodes
	$(document).ready(()=>{
		$(".gainControl").each((index, element)=>{
			element.oninput = ()=>{
				let chan = patch.channels[index];
				chan.gainValue = element.value;
			};
		});

		$(".playbackRateControl").each((index, element)=>{
			element.oninput = ()=>{
				let chan = patch.channels[index];
				let samp = SampleFactory.channels[index];
				samp.sampleSource.playbackRate.value = element.value;
				chan.samplePlaybackRate = element.value;
			};
		});

		$(".hiPassHzControl").each((index, element)=>{
			element.oninput = ()=>{
				let chan = patch.channels[index];
				chan.hiPassHz = element.value;
			};
		});

		$(".loPassHzControl").each((index, element)=>{
			element.oninput = ()=>{
				let chan = patch.channels[index];
				chan.loPassHz = element.value;
			};
		});
	});
});
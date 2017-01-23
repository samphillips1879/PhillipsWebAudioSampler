"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce, Database, AuthFactory){
	$scope.greeting = "Sample Creation";
	$scope.sampleTitle = "";
	$scope.sampleImage = "";
	$scope.sampleCaptured = false;
	$scope.captureStatus = "please capture a sample";
	$scope.capturing = false;

	let conSampleRate = AUD_CTX.sampleRate,
	the_url,
	source = null,
	sourceAnalyser = null,
	sample = null,
	samplesArray = [],
	rec = null,
	newSource = null,
	newBuffer = null,
	arrayBuffer = null;

	//video file submission handler
	$("#userFileInput").change(function() {
	    processVideoFile(this.files[0]);
	});

	// render the video in view
	function processVideoFile(file) {
		Database.uploadVideoToStorageBucket(file, "Title input manually through code");
	}

	//setup web audio path once video loaded
	$('video').on('loadeddata', function (e) {
	    setupForSampleCapture();
	});

	//catch to stop sample capture if video ends
	$('video').on("ended", ()=>{
			$scope.endSampleCapture();
	});

	//create web audio path
	let setupForSampleCapture = ()=>{
		source = AUD_CTX.createMediaElementSource($('#userVideo')[0]);
		source.connect(AUD_CTX.destination);
		rec = new Recorder(source);
	};

	//start recording sample
	$scope.beginSampleCapture = ()=>{	
			$scope.sampleCaptured = false;
			$scope.captureStatus = "capturing sample...";
			$scope.capturing = true;
			console.log("sample capture starting");
			rec.clear();
			$('video')[0].play();
			rec.record();
		};

	//stop recording sample
	$scope.endSampleCapture = ()=>{
		$scope.sampleCaptured = true;
		$scope.capturing = false;
		console.log("sample capture ending");
		rec.stop();
		$('#userVideo')[0].pause();
		rec.getBuffer(createNewBuffer);
		console.log("sample capture ended");
	};

	//recorderJs documentation: 
	// This will pass the recorded stereo buffer (as an array of two Float32Arrays, for the separate left and right channels) to the callback. It can be played back by creating a new source buffer and setting these buffers as the separate channel data:
	//this buffer is only used for the user to preview their sample. What actually gets saved to the storage bucket is a .wav file that contains the same audio information
	function createNewBuffer( buffers ) {
	    newBuffer = AUD_CTX.createBuffer( 2, buffers[0].length, AUD_CTX.sampleRate );
	    newBuffer.getChannelData(0).set(buffers[0]);
	    newBuffer.getChannelData(1).set(buffers[1]);
	    console.log("newBuffer", newBuffer);
	}

	//play back the current sample recording
	$scope.previewSample = ()=>{
		// console.log("previewing sample");
		newSource = AUD_CTX.createBufferSource();
		newSource.buffer = newBuffer;
		newSource.connect(AUD_CTX.destination);
	    newSource.start(0);
	};

	// creates a catalog card, representing the sample, which is stored to firebase database, then uses the unique key returned by firebase as the name of the audio file which is saved to the firebase/google cloud storage bucket
	$scope.saveSample = ()=>{
		if ($scope.sampleTitle) {
			let user = AuthFactory.getUser();
			let title = $scope.sampleTitle;
			let isPublic = true;
			let img = $scope.sampleImage;
			let catalogCard = {
				user, title, isPublic, img
			};
			Database.postSampleToCatalog(catalogCard)
			.then((firebaseReturn)=>{
				rec.exportWAV((blob)=>{
					Database.postNewSampleWav(blob, firebaseReturn.name);
				});
			});
		} else {
			window.alert("please input a title for this sample");
		}
	};	
});
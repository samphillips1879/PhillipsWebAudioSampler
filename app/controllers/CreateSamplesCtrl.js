"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce, Database, AuthFactory){
	$scope.greeting = "Create Samples Controller Connected";

	//variable declarations
	let conSampleRate = AUD_CTX.sampleRate;
	let the_url;
	// let videoEl = $('#userVideo')[0];
	let source = null;
	let sourceAnalyser = null;
	let sample = null;
	let samplesArray = [];
	var rec = null;
	var newSource = null;
	var newBuffer = null;
	let arrayBuffer = null;

	$scope.sampleTitle = "";
	$scope.sampleImage = "";

	//video file submission handler
	$("#userFileInput").change(function() {
	    console.log("this.files", this.files);
	    processVideoFile(this.files[0]);
	});

	// render the video in view
	function processVideoFile(file) {
		console.log("processVideoFile running");
		Database.uploadVideoToStorageBucket(file, "Title input manually through code");
	}

	//setup web audio path once video loaded
	$('video').on('loadeddata', function (e) {
	    console.log("video loaded");
	    setupForSampleCapture();
	});

	//catch to stop sample capture if video ends
	$('video').on("ended", ()=>{
			$scope.endSampleCapture();
	});

	//create web audio path
	let setupForSampleCapture = ()=>{
		console.log("setupForSampleCapture triggered");
		// let videoEl = $('#userVideo')[0];
		source = AUD_CTX.createMediaElementSource($('#userVideo')[0]);
		console.log("source", source);
		source.connect(AUD_CTX.destination);
		rec = new Recorder(source);
		console.log("source established, path initialized: source -> destination");
		// videoEl.play();
		// console.log("video started");
	};

	//start recording sample
	$scope.beginSampleCapture = ()=>{	
			console.log("sample capture starting");
			rec.clear();
			rec.record();
		};

	//stop recording sample
	$scope.endSampleCapture = ()=>{
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
		console.log("previewing sample");
		newSource = AUD_CTX.createBufferSource();
		newSource.buffer = newBuffer;
		newSource.connect(AUD_CTX.destination);
	    newSource.start(0);
	};

	$scope.saveSample = ()=>{
		console.log("saveSample triggered");
		let user = AuthFactory.getUser();
		console.log("user for catalogCard", user);
		let title = $scope.sampleTitle;
		let isPublic = true;
		let img = $scope.sampleImage;
		let catalogCard = {
			user, title, isPublic, img
		};

		Database.postSampleToCatalog(catalogCard)
		//caution here, catalogId might not actually be the object key. It might be a returned object with a name attribute that is equal to what I'm looking for. 
		.then((object)=>{
			// console.log("object", object);
			console.log("object.name: ", object.name);
			rec.exportWAV((blob)=>{
				Database.postNewSampleWav(blob, object.name);
			});
		});
	};	
});




//Failed attempt at manually reproducing recorderJs' functionality; that is, taking the raw audio PCM data and converting it into an audioBuffer that can be played back via an audioBufferSourceNode
	// $scope.beginSampleCapture = ()=>{
	// 		console.log("setting up path, inserting analyser");
	// 		// source = AUD_CTX.createMediaElementSource(videoEl);
	// 		sourceAnalyser = AUD_CTX.createAnalyser();
	// 		source.connect(sourceAnalyser);
	// 		console.log("sourceAnalyser.fftSize", sourceAnalyser.fftSize);
	// 		sourceAnalyser.connect(AUD_CTX.destination);
	// 		console.log("path complete: source -> analyser -> destination");	
	// 		console.log("sample capture started");
	// 	};
	// $scope.endSampleCapture = ()=>{
	// 	console.log("sample capture ending");
	// 	$('#userVideo')[0].pause();
	// 	sample = new Float32Array(sourceAnalyser.frequencyBinCount);
	// 	sourceAnalyser.getFloatFrequencyData(sample);
	// 	console.log("sample", sample);
	// 	samplesArray = samplesArray.concat(sample);
	// 	console.log("samplesArray", samplesArray);
	// 	sourceAnalyser = null;
	// 	sourceAnalyser = null;
	// };

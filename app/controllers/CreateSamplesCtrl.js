"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce, Database){
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
	function createNewBuffer( buffers ) {
	    // newSource = AUD_CTX.createBufferSource();
	    newBuffer = AUD_CTX.createBuffer( 2, buffers[0].length, AUD_CTX.sampleRate );
	 //    console.log("trying to save blank buffer");
	 //    Database.postSampleToFB(newBuffer, "test title")
		// .then((dbObject)=>{
		// 	console.log("dbObject", dbObject);
		// });
		// let channel0Data = buffers[0];
		// console.log("channel0Data", channel0Data);
		// Database.postChannelDataToFB(channel0Data)
		// .then((obj)=>{
		// 	console.log("channel 0 firebase key", obj);
		// 	let channel1Data = buffers[1];
		// 	console.log("channel1Data", channel0Data);
		// 	Database.postChannelDataToFB(channel1Data)
		// 	.then((obj)=>{
		// 		console.log("channel 1 firebase key", obj);
		// 	});
		// });
	    newBuffer.getChannelData(0).set(buffers[0]);
	    newBuffer.getChannelData(1).set(buffers[1]);
	    // newSource.buffer = newBuffer;

	    // newSource.connect( AUD_CTX.destination );
	    console.log("newBuffer", newBuffer);
	    // console.log("newBuffer.getChannelData(0)", newBuffer.getChannelData(0));
	}

	//play back the current sample recording
	$scope.previewSample = ()=>{
		console.log("previewing sample");
		newSource = AUD_CTX.createBufferSource();
		newSource.buffer = newBuffer;
		newSource.connect(AUD_CTX.destination);
	    newSource.start(0);
	};

	$scope.saveSampleWav = ()=>{
		console.log("save sample initialized");
		rec.exportWAV((blob)=>{
			Database.postNewSampleWav(blob, "testTitle");
		});

		// let bufferInObject = {
		// 	audioBuffer: newBuffer
		// };
		// Database.postNewSample(bufferInObject)
		// Database.postNewSample({hello: "world"})
		// Database.postNewSample(newBuffer, "test title")
		// Database.postSampleToFB(newBuffer, "test title")
		// .then((dbObject)=>{
		// 	console.log("dbObject", dbObject);
		// });
	};

	$scope.getSampleWav = ()=>{
		Database.downloadSampleWav("testTitle");
	};




	$scope.decodeAndPlaySample = ()=>{
		let blob = Database.retrieveBlob();
		console.log("blob", blob);

		let reader = new FileReader();
		reader.readAsArrayBuffer(blob);
		reader.onload = (e)=>{
			console.log("e.target.result", e.target.result);
			arrayBuffer = e.target.result;
			



			AUD_CTX.decodeAudioData(arrayBuffer).then(function(decodedData) {
				console.log("decodedData", decodedData);
				let decodedDataSourceNode = AUD_CTX.createBufferSource();
				decodedDataSourceNode.buffer = decodedData;
				decodedDataSourceNode.connect(AUD_CTX.destination);
			    decodedDataSourceNode.start(0);
			 // use the decoded data here
			});
		};


	};

	// $scope.getSampleWav = ()=>{
	// 	Database.getSampleWav()
	// 	.then((sampleWav)=>{
	// 		console.log("got sampleWav");
	// 		console.log("sampleWav", sampleWav);
	// 	});
	// };

	// $scope.getBuffer = ()=>{
	// 	let titleSearch = $("#bufferTitleInput").val();
	// 	Database.getBuffer(titleSearch)
	// 	.then((gotten)=>{
	// 		console.log("gotten buffer", gotten);
	// 	});
	// };

	// $scope.getBufferFailedAttempt = ()=>{
	// 	let keySearch = $("#bufferKeyInput").val();
	// 	Database.tryToGetBuffer(keySearch)
	// 	.then((gotten)=>{
	// 		console.log("gotten buffer", gotten);
	// 	});
	// };


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

"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce, Database){
	$scope.greeting = "Create Samples Controller Connected";


	let the_url;
	// let videoEl = $('#userVideo')[0];
	let source = null;
	let sourceAnalyser = null;
	let sample = null;
	let samplesArray = [];
	let conSampleRate = AUD_CTX.sampleRate;




	// var storageRef = firebase.storage.ref("folderName/file.jpg");




	//VIDEO FILE INPUT and upload HANDLING*********************
	// detect a change in file input
	$("#userFileInput").change(function() {
	    // will log a FileList object
	    console.log("this.files", this.files);
	    // grab the first file in the FileList object and pass it to the function
	    renderFile(this.files[0]);



	    // Database.uploadVideoToDatabase(this.files[0]);
	});









	// render the video in view
	function renderFile(file) {

	  // generate a new FileReader object
	  // var reader = new FileReader();

	  // // inject a video with the src url
	  // reader.onload = function(event) {
	  // 	// console.log("loaded", event);
	  // 	console.log("loaded event", event);

	  //   the_url = event.target.result;
	  //   // console.log("the_url", the_url);
	  //   console.log("the_url processed");
	    
	  //   // Database.uploadVideoToDatabase(the_url);
	  //   console.log("tried to send to db");

	  // };
		Database.uploadVideoToDatabase(file, "Title input manually through code");
    // reader.readAsDataURL(file);
	}








	// $scope.setupForSampleCapture = ()=>{
	// 	console.log("setupForSampleCapture triggered");
	// 	// let videoEl = $('#userVideo')[0];

	// 	source = AUD_CTX.createMediaElementSource(videoEl);
	// 	sourceAnalyser = AUD_CTX.createAnalyser();
	// 	source.connect(sourceAnalyser);
	// 	sourceAnalyser.connect(AUD_CTX.destination);
	// 	console.log("source connected");
	// 	videoEl.play();
	// 	console.log("video started");
	// };


	


	$('video').on('loadeddata', function (e) {
	    console.log("video loaded");
	    setupForSampleCapture();
	});

	// $('video').on("ended", ()=>{
	// 		$scope.endSampleCapture();
	// });


	let setupForSampleCapture = ()=>{
		console.log("setupForSampleCapture triggered");
		// let videoEl = $('#userVideo')[0];

		source = AUD_CTX.createMediaElementSource($('#userVideo')[0]);
		console.log("source", source);
		source.connect(AUD_CTX.destination);
		// sourceAnalyser = AUD_CTX.createAnalyser();
		// source.connect(sourceAnalyser);
		// sourceAnalyser.connect(AUD_CTX.destination);
		console.log("source established, path initialized: source -> destination");
		// videoEl.play();
		// console.log("video started");
	};





	var timeout, clicker = $('#sampleCaptureBtn');

	$('#sampleCaptureBtn').mousedown(function () {
	    $scope.beginSampleCapture(); 
	    timeout = setInterval(function () {
	        //do same thing here again
	        $scope.endSampleCapture();
	        $scope.beginSampleCapture(); 

	    }, 1000 / conSampleRate);

	    return false;
	});
	$('#sampleCaptureBtn').mouseup(function () {
		$scope.endSampleCapture();
	    clearInterval(timeout);
	    return false;
	});
	// $('#sampleCaptureBtn').mouseout(function () {
	// 	$scope.endSampleCapture();
	//     clearInterval(timeout);
	//     return false;
	// });   




//closed
// 	$scope.beginSampleCapture = ()=>{
// 		sample = null;
// 		console.log("setting up path, inserting analyser");
// 		// source = AUD_CTX.createMediaElementSource(videoEl);
// 		sourceAnalyser = AUD_CTX.createAnalyser();
// 		source.connect(sourceAnalyser);



// // come back to this section when it is time to change the length of the sample captured
// 		// console.log("sourceAnalyser.fftSize", sourceAnalyser.fftSize);
// 		// console.log("changing fft size");
// 		// sourceAnalyser.fftSize = 32768;
// 		// console.log("sourceAnalyser.fftSize", sourceAnalyser.fftSize);

// //this chunk should probably be done on the endSampleCapture() function. I believe that it essentially gives all the single samples it can, going from the end backwards, until it reaches the frequencyBinCount

// 		// let sample = new Float32Array(sourceAnalyser.frequencyBinCount);
// 		// sourceAnalyser.getFloatFrequencyData(sample);
// 		// console.log("sample", sample);








// 		// sourceAnalyser.connect(AUD_CTX.destination);
// 		console.log("path complete: source -> analyser -> destination");	
// 		console.log("sample capture started");













// 		// console.log("AUD_CTX.sampleRate", AUD_CTX.sampleRate);
// 		// console.log("conSampleRate", conSampleRate);


// 		// SAMPLING LOGIC

		// var timeout, clicker = $('#sampleCaptureBtn');

		// $('#Clicker').mousedown(function () {
		//     //do something here
		//     timeout = setInterval(function () {
		//         //do same thing here again
		//     }, 1000 / conSampleRate);

		//     return false;
		// });
		// $('#Clicker').mouseup(function () {
		//     clearInterval(timeout);
		//     return false;
		// });
		// $('#Clicker').mouseout(function () {
		//     clearInterval(timeout);
		//     return false;
		// });







// 		//this is the default length of the analyser's.... buffer?
// 		// sourceAnalyser.fftSize = 2048;



// 		// sample = new Float32Array(sourceAnalyser.frequencyBinCount);
// 		// sourceAnalyser.getFloatFrequencyData(sample);
// 		// console.log("sample", sample);
// 		// samplesArray = samplesArray.concat(sample);
// 		// console.log("samplesArray", samplesArray);







// 		// sourceAnalyser = null;


// 	};


	$scope.beginSampleCapture = ()=>{
			console.log("setting up path, inserting analyser");
			// source = AUD_CTX.createMediaElementSource(videoEl);
			sourceAnalyser = AUD_CTX.createAnalyser();
			source.connect(sourceAnalyser);
			console.log("sourceAnalyser.fftSize", sourceAnalyser.fftSize);
			sourceAnalyser.connect(AUD_CTX.destination);
			console.log("path complete: source -> analyser -> destination");	
			console.log("sample capture started");





			// let sample = new Float32Array(sourceAnalyser.frequencyBinCount);
			// sourceAnalyser.getFloatFrequencyData(sample);
			// console.log("sample", sample);








		};


	$scope.endSampleCapture = ()=>{
		console.log("sample capture ended");
		$('#userVideo')[0].pause();
		sample = new Float32Array(sourceAnalyser.frequencyBinCount);
		sourceAnalyser.getFloatFrequencyData(sample);
		console.log("sample", sample);
		samplesArray = samplesArray.concat(sample);
		console.log("samplesArray", samplesArray);

		sourceAnalyser = null;


		// source = null;
		// //this is the default length of the analyser's.... buffer?
		// // sourceAnalyser.fftSize = 2048;
		// let channels = 1;
		// let frameCount = samplesArray.length;
		// let sampleAudioBuffer = AUD_CTX.createBuffer(channels, frameCount, AUD_CTX.sampleRate);
		// for (var channel = 0; channel < channels; channel++) {
		//     // This gives us the actual array that contains the data
		//     var nowBuffering = sampleAudioBuffer.getChannelData(channel);
		//     for (var i = 0; i < frameCount; i++) {
		//       // Math.random() is in [0; 1.0]
		//       // audio needs to be in [-1.0; 1.0]
		//       // nowBuffering[i] = Math.random() * 2 - 1;
		//       nowBuffering[i] = sample[i];
		//     }
		//     console.log("nowBuffering", nowBuffering);
		// }
		// console.log("sampleAudioBuffer", sampleAudioBuffer);

		// let samplesSource = AUD_CTX.createBufferSource();
		// samplesSource.buffer = sampleAudioBuffer;

		// samplesSource.connect(AUD_CTX.destination);

		// samplesSource.onended = ()=>{
		// 	console.log("buffer finished playing");
		// };
		// samplesSource.start();
		// console.log("started samplesSource");






		// $scope.createAudioBuffer();
		sourceAnalyser = null;
		// sample = new Float32Array(sourceAnalyser.frequencyBinCount);
		// sourceAnalyser.getFloatFrequencyData(sample);
		// console.log("sample", sample);





		// //converting "sample" to an audioBuffer to see how long it actually is and what not

		// // Create an empty two second stereo buffer at the
		// // sample rate of the AudioContext
		// let channels = 1;
		// let frameCount = sourceAnalyser.fftSize;

		// let sampleAudioBuffer = AUD_CTX.createBuffer(channels, frameCount, AUD_CTX.sampleRate);

		// for (var channel = 0; channel < channels; channel++) {
		//     // This gives us the actual array that contains the data
		//     var nowBuffering = sampleAudioBuffer.getChannelData(channel);
		//     for (var i = 0; i < frameCount; i++) {
		//       // Math.random() is in [0; 1.0]
		//       // audio needs to be in [-1.0; 1.0]
		//       // nowBuffering[i] = Math.random() * 2 - 1;
		//       nowBuffering[i] = sample[i];
		//     }
		//     console.log("nowBuffering", nowBuffering);
		//   }
		//   console.log("sampleAudioBuffer", sampleAudioBuffer);









		
	};



	




});





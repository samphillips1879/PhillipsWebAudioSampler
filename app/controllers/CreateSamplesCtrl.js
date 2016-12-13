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
	var rec;








	//VIDEO FILE INPUT and upload HANDLING*********************
	// detect a change in file input
	$("#userFileInput").change(function() {
	    // will log a FileList object
	    console.log("this.files", this.files);
	    // grab the first file in the FileList object and pass it to the function
	    renderFile(this.files[0]);
	});









	// render the video in view
	function renderFile(file) {
		Database.uploadVideoToDatabase(file, "Title input manually through code");
	}


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



		rec = new Recorder(source);
		
		console.log("source established, path initialized: source -> destination");
		// videoEl.play();
		// console.log("video started");
	};



	$scope.beginSampleCapture = ()=>{	
			console.log("sample capture starting");
			rec.record();
		};


	$scope.endSampleCapture = ()=>{
		console.log("sample capture ending");


///////
		rec.stop();
///////


		$('#userVideo')[0].pause();
		

		console.log("sample capture ended");
		
	};


	// var timeout, clicker = $('#sampleCaptureBtn');

	// $('#sampleCaptureBtn').mousedown(function () {
	//     $scope.beginSampleCapture(); 
	//     timeout = setInterval(function () {
	//         //do same thing here again
	//         $scope.endSampleCapture();
	//         $scope.beginSampleCapture(); 

	//     }, 1000 / conSampleRate);

	//     return false;
	// });
	// $('#sampleCaptureBtn').mouseup(function () {
	// 	$scope.endSampleCapture();
	//     clearInterval(timeout);
	//     return false;
	// });
	// $('#sampleCaptureBtn').mouseout(function () {
	// 	$scope.endSampleCapture();
	//     clearInterval(timeout);
	//     return false;
	// });   







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

});





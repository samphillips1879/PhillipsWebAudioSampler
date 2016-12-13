"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce, Database){
	$scope.greeting = "Create Samples Controller Connected";


	let the_url;
	// let videoEl = $('#userVideo')[0];
	let source = null;
	let sourceAnalyser = null;



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
	  var reader = new FileReader();

	  // inject a video with the src url
	  reader.onload = function(event) {
	  	// console.log("loaded", event);
	  	console.log("loaded event", event);

	    the_url = event.target.result;
	    // console.log("the_url", the_url);
	    console.log("the_url processed");
	    
	    // Database.uploadVideoToDatabase(the_url);
	    console.log("tried to send to db");

	  };
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

	$scope.beginSampleCapture = ()=>{
		console.log("setting up path, inserting analyser");
		// source = AUD_CTX.createMediaElementSource(videoEl);
		sourceAnalyser = AUD_CTX.createAnalyser();
		source.connect(sourceAnalyser);
		console.log("sourceAnalyser.fftSize", sourceAnalyser.fftSize);
		sourceAnalyser.connect(AUD_CTX.destination);
		console.log("path complete: source -> analyser -> destination");	
		console.log("sample capture started");





		let sample = new Float32Array(sourceAnalyser.frequencyBinCount);
		sourceAnalyser.getFloatFrequencyData(sample);
		console.log("sample", sample);








	};

	$scope.endSampleCapture = ()=>{
		console.log("sample capture ended");
		$('#userVideo')[0].pause();
		// source = null;



		// let sample = new Float32Array(sourceAnalyser.frequencyBinCount);
		// sourceAnalyser.getFloatFrequencyData(sample);
		// console.log("sample", sample);




		sourceAnalyser = null;
	};



	// $scope.beginEditingVideo = ()=>{
	// 	console.log("begin editing video triggered");

	// 	let source = AUD_CTX.createMediaElementSource($('#userVideo')[0]);
	// 	let sourceAnalyser = AUD_CTX.createAnalyser();
	// 	source.connect(sourceAnalyser);
	// 	sourceAnalyser.connect(AUD_CTX.destination);
	// 	console.log("source connected");
	// };




});
    
	// progress stuff
		// var reader;
		//   var progress = document.querySelector('.percent');

		//   function abortRead() {
		//     reader.abort();
		//   }

		//   function errorHandler(evt) {
		//     switch(evt.target.error.code) {
		//       case evt.target.error.NOT_FOUND_ERR:
		//         alert('File Not Found!');
		//         break;
		//       case evt.target.error.NOT_READABLE_ERR:
		//         alert('File is not readable');
		//         break;
		//       case evt.target.error.ABORT_ERR:
		//         break; // noop
		//       default:
		//         alert('An error occurred reading this file.');
		//     };
		//   }

		//   function updateProgress(evt) {
		//     // evt is an ProgressEvent.
		//     if (evt.lengthComputable) {
		//       var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
		//       // Increase the progress bar length.
		//       if (percentLoaded < 100) {
		//         progress.style.width = percentLoaded + '%';
		//         progress.textContent = percentLoaded + '%';
		//       }
		//     }
		//   }

		//   function handleFileSelect(evt) {
		//     // Reset progress indicator on new file selection.
		//     progress.style.width = '0%';
		//     progress.textContent = '0%';

		//     reader = new FileReader();
		//     reader.onerror = errorHandler;
		//     reader.onprogress = updateProgress;
		//     reader.onabort = function(e) {
		//       alert('File read cancelled');
		//     };
		//     reader.onloadstart = function(e) {
		//       document.getElementById('progress_bar').className = 'loading';
		//     };
		//     reader.onload = function(e) {
		//       // Ensure that the progress bar displays 100% at the end.
		//       progress.style.width = '100%';
		//       progress.textContent = '100%';
		//       setTimeout("document.getElementById('progress_bar').className='';", 2000);
		//     }

		//     // Read in the image file as a binary string.
		//     reader.readAsBinaryString(evt.target.files[0]);
		//   }

		//   document.getElementById('files').addEventListener('change', handleFileSelect, false);
		  // when the file is read it triggers the onload event above.
		//   reader.readAsDataURL(file);
		// }
	//******************************************





	//attaching video to web audio api stuff*****************

		// $scope.createSourceFromVideo = ()=>{

		// 	// FileAPI.support.cors = true;
		// 	// console.log("$('#userVideo')", $('#userVideo')[0]);
		// 	// $("userVideo")[0].crossOrigin = "anonymous";
		// 	// $("userVideo")[0].
			// let source = AUD_CTX.createMediaElementSource($('#userVideo')[0]);
		// 	console.log("source", source);
		// 	source.connect(AUD_CTX.destination);

		// };







	// ***************************************************
































































// //VIDEO FILE INPUT HANDLING*********************
// 	// detect a change in file input
// 	$("#userFileInput").change(function() {
// 	    // will log a FileList object
// 	    console.log("this.files", this.files);
// 	    // grab the first file in the FileList object and pass it to the function
// 	    renderFile(this.files[0]);
// 	});

// 	// render the video in view
// 	function renderFile(file) {

// 	  // generate a new FileReader object
// 	  var reader = new FileReader();

// 	  // inject a video with the src url
// 	  reader.onload = function(event) {
// 	  	// console.log("loaded", event);
// 	  	console.log("loaded event", event);

// 	    the_url = event.target.result;
// 	    // console.log("the_url", the_url);
// 	    console.log("the_url processed");

// 	    console.log("$(userVideo)[0]", $("#userVideo")[0]);


// 	    $("#userVideo").attr("src", `${the_url}`);
// 	    console.log("set userVideo source");
// 	    console.log("userVideo", $("#userVideo"));
// 	    // $("#userVideo").crossOrigin = "anonymous";
// 	    console.log('$("#userVideo")', $("#userVideo"));
// 	    // console.log("set cross origin");



// 	    setTimeout(function(arg1) {
// 		    $("#userVideo")[0].load();
// 		    console.log("tried to load video");
// 	      }, 5000);





// 	    //create an audio source using the video
// 	    $scope.createSourceFromVideo();



// 	  };
// // progress stuff
// 	// var reader;
// 	//   var progress = document.querySelector('.percent');

// 	//   function abortRead() {
// 	//     reader.abort();
// 	//   }

// 	//   function errorHandler(evt) {
// 	//     switch(evt.target.error.code) {
// 	//       case evt.target.error.NOT_FOUND_ERR:
// 	//         alert('File Not Found!');
// 	//         break;
// 	//       case evt.target.error.NOT_READABLE_ERR:
// 	//         alert('File is not readable');
// 	//         break;
// 	//       case evt.target.error.ABORT_ERR:
// 	//         break; // noop
// 	//       default:
// 	//         alert('An error occurred reading this file.');
// 	//     };
// 	//   }

// 	//   function updateProgress(evt) {
// 	//     // evt is an ProgressEvent.
// 	//     if (evt.lengthComputable) {
// 	//       var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
// 	//       // Increase the progress bar length.
// 	//       if (percentLoaded < 100) {
// 	//         progress.style.width = percentLoaded + '%';
// 	//         progress.textContent = percentLoaded + '%';
// 	//       }
// 	//     }
// 	//   }

// 	//   function handleFileSelect(evt) {
// 	//     // Reset progress indicator on new file selection.
// 	//     progress.style.width = '0%';
// 	//     progress.textContent = '0%';

// 	//     reader = new FileReader();
// 	//     reader.onerror = errorHandler;
// 	//     reader.onprogress = updateProgress;
// 	//     reader.onabort = function(e) {
// 	//       alert('File read cancelled');
// 	//     };
// 	//     reader.onloadstart = function(e) {
// 	//       document.getElementById('progress_bar').className = 'loading';
// 	//     };
// 	//     reader.onload = function(e) {
// 	//       // Ensure that the progress bar displays 100% at the end.
// 	//       progress.style.width = '100%';
// 	//       progress.textContent = '100%';
// 	//       setTimeout("document.getElementById('progress_bar').className='';", 2000);
// 	//     }

// 	//     // Read in the image file as a binary string.
// 	//     reader.readAsBinaryString(evt.target.files[0]);
// 	//   }

// 	//   document.getElementById('files').addEventListener('change', handleFileSelect, false);
// 	  // when the file is read it triggers the onload event above.
// 	  reader.readAsDataURL(file);
// 	}
// //******************************************





// //attaching video to web audio api stuff*****************

// 	$scope.createSourceFromVideo = ()=>{

// 		// FileAPI.support.cors = true;
// 		// console.log("$('#userVideo')", $('#userVideo')[0]);
// 		// $("userVideo")[0].crossOrigin = "anonymous";
// 		// $("userVideo")[0].
// 		let source = AUD_CTX.createMediaElementSource($('#userVideo')[0]);
// 		console.log("source", source);
// 		source.connect(AUD_CTX.destination);

// 	};







// // ***************************************************


















































	// function renderVideo(file){
 //        var reader = new FileReader();
 //        reader.onload = function(event){
 //        	console.log("loaded event", event);
 //        	// console.log("event.target.result", event.target.result);
 //            the_url = event.target.result;
 //            console.log("the_url", the_url);



 //            $("#userVideo").attr("src", `${the_url}`);
 //            $("#userVideo").load();








 //      // of course using a template library like handlebars.js is a better solution than just inserting a string
 //      // $('#userVideo').attr("<video width='400' controls><source id='vid-source' src='"+the_url+"' type='video/mp4'></video>")
 //       // $('#name-vid').html(file.name)]
 //       //      $('#size-vid').html(humanFileSize(file.size, "MB"))
 //       //      $('#type-vid').html(file.type)

 //        };
    
 //    //when the file is read it triggers the onload event above.
 //        reader.readAsDataURL(file);
 //    }


 //    $( "#the-video-file-field" ).change(function() {
 //            console.log("video file has been chosen");
 //            //grab the first image in the fileList
 //            //in this example we are only loading one file.
 //            console.log(this.files[0].size);
 //            renderVideo(this.files[0]);

 //        });
	 







	// // handle input changes
	// $("#the-file-input").change(function() {
	//     console.log(this.files)
	    
	//     // grab the first image in the FileList object and pass it to the function
	//     renderImage(this.files[0])
	// });


// });
"use strict";
app.controller('AssignSamplesCtrl', function($scope, Database){
	$scope.greeting = "Assign Samples Controller Connected";



	let arrayBuffer = null;
	let sampleBuffer = null;


	$scope.getSampleWav = ()=>{
		Database.downloadSampleWav("testTitle");
		// $scope.decodeSample(); 
	};




//want this to be triggered through a ".then()" attached to Database.downloadSampleWav, but for now I'll tie it to a button in the dom because that function does not yet return a promise
	$scope.decodeSample = ()=>{
		let blob = Database.retrieveBlob();
		console.log("blob about to be decoded", blob);
		let reader = new FileReader();
		reader.readAsArrayBuffer(blob);
		reader.onload = (e)=>{
			// console.log("e.target.result", e.target.result);
			arrayBuffer = e.target.result;
			AUD_CTX.decodeAudioData(arrayBuffer).then(function(decodedData) {
				sampleBuffer = decodedData;
			});
		};
	};

	$scope.playSample = ()=>{
		let sampleSourceNode = AUD_CTX.createBufferSource();
		sampleSourceNode.buffer = sampleBuffer;
		sampleSourceNode.connect(AUD_CTX.destination);
	    sampleSourceNode.start(0);
	};






});
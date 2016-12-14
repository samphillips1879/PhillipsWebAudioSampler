"use strict";
app.controller('AssignSamplesCtrl', function($scope, Database){
	$scope.greeting = "Assign Samples Controller Connected";



	let arrayBuffer = null;


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
			});
		};
	};






});
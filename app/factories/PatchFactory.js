"use strict";

app.factory("PatchFactory", ()=>{
	let PatchFactory = {};



	//this following chunk will be replaced with a call to firebase, setting currentPatch as the database-wide default patch
	let currentPatch = {

		channels: {

			channel0: 
				{
					channelNum: 0,
					sourceOsc: null,
					gain: null,
					gainValue: 1
				},
			channel1: 
				{
					channelNum: 1,
					sourceOsc: null,
					gain: null,
					gainValue: 0.5
				}
		}


		// chan_0: {
		// 	osc: null,
		// 	gain: null,
		// 	gainValue: 1

		// }
		// let chan_0 = currentPatch.chan_0; 

		//nodes


		//path(excluding audio source)
		// chan_0.gain0.connect(AUD_CTX.destination);


		//node values

		// channels.push

	};




	// let currentPatch = {

	// 	channels: [

	// 		{
	// 			channelNum: 0,
	// 			sourceOsc: null,
	// 			gain: null,
	// 			gainValue: 1
	// 		},
	// 		{
	// 			channelNum: 1,
	// 			sourceOsc: null,
	// 			gain: null,
	// 			gainValue: 0.5
	// 		}
	// 	]


	// 	// chan_0: {
	// 	// 	osc: null,
	// 	// 	gain: null,
	// 	// 	gainValue: 1

	// 	// }
	// 	// let chan_0 = currentPatch.chan_0; 

	// 	//nodes


	// 	//path(excluding audio source)
	// 	// chan_0.gain0.connect(AUD_CTX.destination);


	// 	//node values

	// 	// channels.push

	// };


	











	PatchFactory.getCurrentPatch = ()=>{
		return currentPatch;	
	};








	return PatchFactory;
});
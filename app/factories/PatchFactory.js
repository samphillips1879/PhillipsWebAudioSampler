"use strict";

app.factory("PatchFactory", ()=>{
	let PatchFactory = {};
	//this following chunk will be replaced with a call to firebase, setting currentPatch as the database-wide default patch
	PatchFactory.currentPatch = {
		isPublic: true,
		title: "Default Patch",
		author: null,
		channels: [
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 0,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 1,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 2,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 3,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 4,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 5,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 6,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			},
			{
				// sampleSource: null,
				// sampleBuffer: null,
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				channelNum: 7,
				sourceOsc: null,
				gain: null,
				gainValue: 1
			}
		]
	};

	// PatchFactory.getCurrentPatch = ()=>{
	// 	return PatchFactory.currentPatch;	
	// };

	return PatchFactory;
});
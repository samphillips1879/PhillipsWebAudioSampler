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
				loopSample: true,
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
				loopSample: false,
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
				loopSample: false,
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
				loopSample: false,
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
				loopSample: false,
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
				loopSample: false,
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
				loopSample: false,
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
				loopSample: false,
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
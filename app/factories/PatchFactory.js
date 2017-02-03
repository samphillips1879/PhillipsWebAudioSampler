"use strict";

app.factory("PatchFactory", ()=>{
	let PatchFactory = {};
	PatchFactory.currentPatch = {
		isPublic: true,
		title: "Default Patch",
		author: null,
		channels: [
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 0,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 1,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 2,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 3,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 4,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 5,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 6,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			},
			{
				sampleTitle: null,
				sampleWavName: null,
				sampleAuthor: null,
				loopSample: false,
				samplePlaybackRate: 1,
				channelNum: 7,
				sourceOsc: null,
				gain: null,
				gainValue: 1,
				hiPassFilter: null,
				hiPassHz: 0,
				loPassFilter: null,
				loPassHz: 20000
			}
		]
	};

	// PatchFactory.getCurrentPatch = ()=>{
	// 	return PatchFactory.currentPatch;	
	// };

	return PatchFactory;
});
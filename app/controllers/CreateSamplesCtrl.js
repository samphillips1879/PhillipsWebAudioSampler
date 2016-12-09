"use strict";
app.controller("CreateSamplesCtrl", function($scope, $sce){
	$scope.greeting = "Create Samples Controller Connected";

	// $scope.youtube = null;

	$scope.inputURL = ``;
	console.log("$scope.iframeYoutube", $scope.iframeYoutube);


	$scope.grabYoutubeVideo = ()=>{
		// $scope.iframeYoutube = $sce.trustAsHtml(`${$scope.inputURL}`);
		// $scope.inputURL = ``;








		// mb.ytplayer stuff
		$(function(){
		     jQuery("#P1").YTPlayer();
		   });


		// ()=>{
		// 	$("#P1")
		// }






		// let iframe = $("iframe")[0];
		// console.log("iframe", iframe);
		// console.log("iframe.src", iframe.src);
		// console.log("iframe.contentDocument", iframe.contentDocument);
		// console.log("iframe.contentWindow", iframe.contentWindow);









		// setTimeout(function(){ 


		// 	let iframes = $("iframe");
		// 	console.log("iframes", iframes);

		// 	// let iframe = $("iframe")[0];
		// 	// console.log("iframe", iframe);



		// 	// let buttons = $("button");
		// 	// console.log("buttons", buttons);

		// 	// let playBtn = $(".ytp-button");
		// 	// console.log("playBtn", playBtn);



		// 	let video = $("video");
		// 	console.log("video", video);
		// }, 3000);



		// <button class="ytp-large-play-button ytp-button" aria-label="Watch Donald Trump Says &quot;China&quot;"><svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.81"></path><path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"></path><path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"></path></svg></button>



		// console.log("bodies", $("embed"));
		// console.log("iframes", $("iframe"));


		// var w = $("iframe")[0];
		// // var w = $("iframe")[0];
		// console.log("w", w);
		// let x = w.childNodes;
		// console.log("x", x);

		// console.log(document.getElementsByTagName("html"));



		// var x = w.eq(0);
		// console.log("x", x);
		// var y = x.contentWindow;
		// // var y = (x.contentWindow || x.contentDocument);
		// console.log("y", y);
		// if (y.document)y = y.document;
		// y.body.style.backgroundColor = "red";



		//createMediaElementSource(video)
		// let video = $("video");
		// console.log("video", video);
	};









	// $(document).on("click", "#vidHolder", (event)=>{
	// 	console.log("iframe click event", event);
	// });


	// $('iframe').click(()=>{
	// 	console.log("clicked an iframe");
	// });



	// $('iframe[src="other.html"]').contents().find("#btnInside").click();




});
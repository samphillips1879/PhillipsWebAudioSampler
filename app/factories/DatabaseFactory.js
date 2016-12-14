"use strict";

app.factory("Database", ($http, $routeParams, FBCreds, AuthFactory)=>{
	// console.log("URL", FBCreds.URL);
    let DatabaseFactory = {};
    let fbStorage = firebase.storage();


    DatabaseFactory.getUserSamples = ()=>{
    	let samples = [];
        let currentUser = AuthFactory.getUser();
    	return new Promise((resolve, reject)=>{
			$http.get(`${FBCreds.URL}/samples.json?orderBy="uid"&equalTo="${currentUser}`) 
			.success((sampleCollection)=>{
				Object.keys(sampleCollection).forEach((key)=>{
					sampleCollection[key].id = key;
					samples.push(sampleCollection[key]);
				});
				resolve(samples);
			})
			.error((error)=>{
				reject(error);
			});   		
    	});
    };

    DatabaseFactory.getCommunitySamples = ()=>{
        let samples = [];
        // let currentUser = AuthFactory.getUser();
        return new Promise((resolve, reject)=>{
            $http.get(`${FBCreds.URL}/samples.json`) 
            .success((sampleCollection)=>{
                Object.keys(sampleCollection).forEach((key)=>{
                    sampleCollection[key].id = key;
                    samples.push(sampleCollection[key]);
                });
                resolve(samples);
            })
            .error((error)=>{
                reject(error);
            });         
        });
    };

     DatabaseFactory.uploadVideoToStorageBucket = (videoFile, title)=>{
        console.log("trying to upload video to storage bucket");
        //some slightly poor form here, I know, as dom manipulation should be separate from the factory. However, it works for now, and I intend to clean it up/modularize it appropriately later.
        let user = AuthFactory.getUser();
        // console.log("videoFile", videoFile);
        var storage = firebase.storage();
        // saves video to firebase storage userVideos folder with a name equivalent to the current user
        var storageRef = storage.ref(`userVideos/${user}`);
        console.log("storageRef", storageRef);
        storageRef.put(videoFile)
        .then((thing)=>{
            //gets a url to the video, hosted in app's storage bucket, and sets it as the source for the userVideo in the dom
            // console.log("thing", thing);
            storageRef.getDownloadURL().then(function(url) {
                $("#userVideo")[0].src = url;
                // console.log("url", url);
                console.log("set video src equal to", url);
            }).catch(function(error) {
              // Handle any errors
            });
        });
    };


    DatabaseFactory.downloadUserVideo = (videoUrl)=>{
        console.log("trying to download", videoUrl);
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: `${videoUrl}`
            }).done((video)=>{
                console.log("video", video);
            }).fail((error)=>{
                console.log("error", error);
            });
        });
    };

    DatabaseFactory.postNewSampleWav = (newSample, bufferTitle)=>{
        console.log("posting new sample");
        let user = AuthFactory.getUser();
        // console.log("videoFile", videoFile);
        var storage = firebase.storage();
        // saves video to firebase storage userVideos folder with a name equivalent to the current user
        var storageRef = storage.ref(`audioBuffers/${user}/${bufferTitle}`);
        console.log("storageRef", storageRef);
        storageRef.put(newSample)
        .then((thing)=>{
            console.log("thing", thing);
            //gets a url to the video, hosted in app's storage bucket, and sets it as the source for the userVideo in the dom
            // console.log("thing", thing);
            // storageRef.getDownloadURL().then(function(url) {
            //     $("#userVideo")[0].src = url;
            //     // console.log("url", url);
            //     console.log("set video src equal to", url);
            // }).catch(function(error) {
            //   // Handle any errors
            // });
        });
    };

    DatabaseFactory.getSampleWav = (sampleTitle)=>{
        let user = AuthFactory.getUser();
        // return new Promise((resolve,reject)=>{
        //     $http.get(`https://firebasestorage.googleapis.com/v0/b/phillipswebaudiosampler.appspot.com/o/audioBuffers%2FeYgXHDh1CbbBS3loQ9sommDMCyM2%2FtestTitle?alt=media&token=5ef0e41e-7928-4e60-8f73-e33af6626851`)
        //     .success((itemObject)=>{
        //         resolve(itemObject);
        //     })
        //     .error((error)=>{
        //         reject(error);
        //     });
        // });
        // console.log("user", user);
        // let storage = firebase.storage();

        // //manually
        console.log("making storage variable");
        let storage = firebase.storage();
        console.log("made storage variable");
        console.log("making storageRef variable");
    //manual
        // let storageRef = storage.ref(`audioBuffers/eYgXHDh1CbbBS3loQ9sommDMCyM2/testTitle`);
    //dynamic    
        let storageRef = storage.ref(`audioBuffers/${user}/${sampleTitle}`);
        // let storageRef = storage.ref(`audioBuffers/eYgXHDh1CbbBS3loQ9sommDMCyM2%2F/testTitle`);
        console.log("made storageRef variable");

        console.log("trying to get downloadURL");

        storageRef.getDownloadURL().then(function(url) {
          // `url` is the download URL for 'images/stars.jpg'
          console.log("tried to get downloadURL", url);
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
            console.log("xhr.response", xhr.response);
          };
          xhr.open('GET', url);
          xhr.send();

          // // Or inserted into an <img> element:
          // var img = document.getElementById('myimg');
          // img.src = url;
        }).catch(function(error) {
          // Handle any errors
        });


        //dynamically
        // let storageRef = storage.ref(`audioBuffers/${user}/${sampleTitle}`);
        
    };





        // storageRef.getDownloadURL().then(function(url) {

//manual download url

            // https://firebasestorage.googleapis.com/v0/b/phillipswebaudiosampler.appspot.com/o/audioBuffers%2FeYgXHDh1CbbBS3loQ9sommDMCyM2%2FtestTitle?alt=media&token=5ef0e41e-7928-4e60-8f73-e33af6626851


            // phillipswebaudiosampler.appspot.com
//dynamic download url.... hopefully
            // `https://firebasestorage.googleapis.com/v0/b/{FBCreds.storageBucket}/o/audioBuffers%2F${user}%2F${sampleTitle}?alt=media&token=5ef0e41e-7928-4e60-8f73-e33af6626851`










          // `url` is the download URL
          // return new Promise((resolve,reject)=>{
          //   $http.get
          // })
          // // This can be downloaded directly:
          // var xhr = new XMLHttpRequest();
          // xhr.responseType = 'blob';
          // xhr.onload = function(event) {
          //   var blob = xhr.response;
          //   console.log("xhr.respons", xhr.response);
          // };
          // xhr.open('GET', url);
          // xhr.send();

          // // Or inserted into an <img> element:
          // var img = document.getElementById('myimg');
          // img.src = url;
    //     }).catch(function(error) {
    //       // Handle any errors
    //     });  
    // };

    // DatabaseFactory.postChannelDataToFB = (sample, title)=>{
    //     console.log("hello from database factory");
    //     return new Promise((resolve,reject)=>{
    //         $http.post(`${FBCreds.URL}/channelData.json`, angular.toJson(sample))
    //         .success((itemObject)=>{
    //             console.log("success");
    //             resolve(itemObject);
    //         })          
    //         .error((error)=>{
    //             console.log("error");
    //             reject(error);
    //         });
    //     });
    // };


    //  DatabaseFactory.uploadVideoToStorageBucket = (videoFile, title)=>{
    //     //some slightly poor form here, I know, as dom manipulation should be separate from the factory. However, it works for now, and I intend to clean it up/modularize it appropriately later.
    // };

    

    DatabaseFactory.updateSample = (updatedSample, sampleId)=>{
    	// let targ = $routeParams.itemId;
    	// console.log("targ =", targ);
    	// console.log("updatedItem", updatedItem);
    	return new Promise((resolve,reject)=>{
    		$http.put(`${FBCreds.URL}/samples/${sampleId}.json`, angular.toJson(updatedSample))
    		.success((sampleObject)=>{
    			resolve(sampleObject);
    		})
    		.error((error)=>{
    			reject(error);
    		});
    	});
    };

    DatabaseFactory.deleteSample = (sampleId)=>{
        return new Promise((resolve,reject)=>{
            $http.delete(`${FBCreds.URL}/samples/${sampleId}.json`)
            .success((sampleObject)=>{
                resolve(sampleObject);
            })
            .error((error)=>{
                reject(error);
            });
        });
    };


    


    return DatabaseFactory;


});
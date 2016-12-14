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
                console.log("url", url);
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

    DatabaseFactory.postNewSample = (newItem)=>{
    	return new Promise((resolve,reject)=>{
			$http.post(`${FBCreds.URL}/items.json`, angular.toJson(newItem))
			.success((itemObject)=>{
				resolve(itemObject);
			})    		
			.error((error)=>{
				reject(error);
			});
    	});
    };

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
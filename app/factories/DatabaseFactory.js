"use strict";

app.factory("Database", ($http, $routeParams, FBCreds, AuthFactory)=>{
    let DatabaseFactory = {},
        fbStorage = firebase.storage(),
        blob = null,
        wavURL = null,
        noResults = [];

    DatabaseFactory.browseUserSamples = ()=>{
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

    DatabaseFactory.browseCommunitySamples = ()=>{
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
        // console.log("trying to upload video to storage bucket");
        //some slightly poor form here, I know, as dom manipulation should be separate from the factory. However, it works for now, and I intend to clean it up/modularize it appropriately later.
        let user = AuthFactory.getUser();
        // console.log("videoFile", videoFile);
        var storage = firebase.storage();
        // saves video to firebase storage userVideos folder with a name equivalent to the current user
        var storageRef = storage.ref(`userVideos/${user}`);
        // console.log("storageRef", storageRef);
        storageRef.put(videoFile)
        .then((thing)=>{
            //gets a url to the video, hosted in app's storage bucket, and sets it as the source for the userVideo in the dom
            storageRef.getDownloadURL().then(function(url) {
                $("#userVideo")[0].src = url;
            }).catch(function(error) {
              // Handle any errors
            });
        });
    };
//can probably be removed
    // DatabaseFactory.downloadUserVideo = (videoUrl)=>{
    //     console.log("trying to download", videoUrl);
    //     return new Promise((resolve,reject)=>{
    //         $.ajax({
    //             url: `${videoUrl}`
    //         }).done((video)=>{
    //             // console.log("video", video);
    //         }).fail((error)=>{
    //             // console.log("error", error);
    //         });
    //     });
    // };

    DatabaseFactory.postSampleToCatalog = (catalogCard)=>{
        return new Promise((resolve,reject)=>{
            $http.post(`${FBCreds.URL}/sampleCatalog.json`, angular.toJson(catalogCard))
            .success((catalogObj)=>{
                resolve(catalogObj);
            })
            .error((error)=>{
                reject(error);
            });
        });
    };

    DatabaseFactory.getPublicSampleCatalogCards = ()=>{
        console.log("factory retrieving all public sample catalog cards");  
        return new Promise((resolve,reject)=>{
            $http.get(`${FBCreds.URL}/sampleCatalog.json?orderBy="isPublic"&equalTo=true`)
            .success((publicSampleCards)=>{
                console.log("publciSampleCards", publicSampleCards);
                let array = [];
                Object.keys(publicSampleCards).forEach((key)=>{
                    publicSampleCards[key].wavName = key;
                    array = $.map(publicSampleCards, function(value, index) {
                        return [value];
                    });
                });
                console.log("got public sample catalog cards: ", array);
                resolve(array);
            })
            .error((error)=>{
                reject(error);
            });
        });
    };

    DatabaseFactory.getUserSampleCatalogCards = (user)=>{
            // console.log("factory retrieving sample catalog cards for user: ", user);  
            return new Promise((resolve,reject)=>{
                $http.get(`${FBCreds.URL}/sampleCatalog.json?orderBy="user"&equalTo="${user}"`)
                .success((userSampleCards)=>{
                    let array = [];
                    Object.keys(userSampleCards).forEach((key)=>{
                        userSampleCards[key].wavName = key;
                        array = $.map(userSampleCards, function(value, index) {
                            return [value];
                        });
                    });
                    // console.log("got user's sample catalog cards: ", array);
                    if (user !== "anonymous") {
                        resolve(array);
                    } else {
                        resolve(noResults);
                    }
                })
                .error((error)=>{
                    reject(error);
                });
            });
    };

    DatabaseFactory.postNewSampleWav = (newSample, bufferTitle)=>{
        // console.log("posting new sample");
        let user = AuthFactory.getUser();
        var storage = firebase.storage();
        var storageRef = storage.ref(`audioBuffers/${user}/${bufferTitle}`);
        // console.log("storageRef", storageRef);
        storageRef.put(newSample)
        .then((object)=>{
            // console.log(".wav saved to bucket", object);
        });
    };

    DatabaseFactory.getWavURL = (user, wavName)=>{
        let storage = firebase.storage();
        let storageRef = storage.ref(`audioBuffers/${user}/${wavName}`);
        return storageRef.getDownloadURL();
    };

    DatabaseFactory.downloadWav = (wavURL)=>{
        // console.log("trying to download wav from: ", wavURL);
        return new Promise((resolve,reject)=>{
            $http({
                url: `${wavURL}`,
                method: "GET",
                responseType: "blob"
            })
            .success((wavBlob)=>{
                // console.log("got wav here in DatabaseFactory", wavBlob);
                resolve(wavBlob);
            })
            .error((error)=>{
                reject(error);
            });
        });
    };

    // DatabaseFactory.retrieveBlob = ()=>{
    //     return blob;
    // };

    // DatabaseFactory.updateSample = (updatedSample, sampleId)=>{
    // 	// let targ = $routeParams.itemId;
    // 	// console.log("targ =", targ);
    // 	// console.log("updatedItem", updatedItem);
    // 	return new Promise((resolve,reject)=>{
    // 		$http.put(`${FBCreds.URL}/samples/${sampleId}.json`, angular.toJson(updatedSample))
    // 		.success((sampleObject)=>{
    // 			resolve(sampleObject);
    // 		})
    // 		.error((error)=>{
    // 			reject(error);
    // 		});
    // 	});
    // };

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

    DatabaseFactory.postNewPatch = (patch)=>{
        // console.log("got a patch: ", patch);
        return new Promise((resolve,reject)=>{
            $http.post(`${FBCreds.URL}/patches.json`, angular.toJson(patch))
            .success((object)=>{
                resolve(object);
            })
            .error((error)=>{
                reject(error);
            });
        });
    };

    DatabaseFactory.getPublicPatches = ()=>{
        // console.log("factory retrieving all public patches");  
        return new Promise((resolve,reject)=>{
            $http.get(`${FBCreds.URL}/patches.json?orderBy="isPublic"&equalTo=true`)
            .success((publicPatches)=>{
                // console.log("publicPatches", publicPatches);
                let array = [];
                Object.keys(publicPatches).forEach((key)=>{
                    publicPatches[key].patchID = key;
                    array = $.map(publicPatches, function(value, index) {
                        return [value];
                    });
                });
                // console.log("got public patches: ", array);
                resolve(array);
            })
            .error((error)=>{
                reject(error);
            });
        });
    };

    DatabaseFactory.getUserPatches = (user)=>{
            // console.log("factory retrieving all public patches");  
            return new Promise((resolve,reject)=>{
                $http.get(`${FBCreds.URL}/patches.json?orderBy="author"&equalTo="${user}"`)
                .success((userPatches)=>{
                    // console.log("userPatches", userPatches);
                    let array = [];
                    Object.keys(userPatches).forEach((key)=>{
                        userPatches[key].patchID = key;
                        array = $.map(userPatches, function(value, index) {
                            return [value];
                        });
                    });
                    // console.log("got user patches: ", array);
                    if (user !== "anonymous") {
                        resolve(array);
                    } else {
                        resolve(noResults);
                    }
                })
                .error((error)=>{
                    reject(error);
                });
            });
    };
    return DatabaseFactory;
});
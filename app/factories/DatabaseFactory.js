"use strict";

app.factory("Database", ($http, $routeParams, FBCreds, AuthFactory)=>{
	// console.log("URL", FBCreds.URL);
    let DatabaseFactory = {};


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

    // DatabaseFactory.getSingleItem = (itemId)=>{
    // 	// console.log("getting a single item");
    // 	return new Promise((resolve, reject)=>{
    // 		$http.get(`${FBCreds.URL}/items/${itemId}.json`)
    // 		.success((itemObject)=>{
    // 			resolve(itemObject);
    // 		})
    // 		.error((error)=>{
    // 			reject(error);
    // 		});
    // 	});
    // };

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
#Life Audio Sampler
The Life Audio Sampler is a web application that allows users to upload a video and then sample audio clips from it. The audio samples can then be saved and loaded into the application's sampler for musical playback. Eight separate samples can be loaded into the eight sampler channels at one time. Together, these eight channels make a patch, which can also be saved, and later reloaded, to be used in the sampler by all users.

##Installation
To download and run this application, enter into your command line: 

```
 git clone https://github.com/samphillips1879/PhillipsWebAudioSampler.git
```

Next, in the lib folder of this project, enter:
```
 npm install
```


If you don't already have it on your machine, install [http-server](https://www.npmjs.com/package/http-server) to run the app:
```
 npm install http-server -g
```
Then, at the root folder, run http-server to launch the application.

##Using the Life Audio Sampler
In order to use the Life Audio Sampler, users must either login or register. 



Next, users are taken to the sampler view. To get back to this view later, users may click the "Play" tab.



However, in order to play the sampler, the user must first load samples into the channels. The quickest way to do this is to click on the "Patches" tab and choose one of the pre-made public patches. Additionally, any patches saved by the user will be found by clicking the "Your Patches" button on this view.



Users can also choose which samples they want to load individually by clicking on the "Browse Samples" tab. Once there, the user may browse all publicly submitted samples as well as any samples they created themselves.



###Create Samples

Users may upload an mp4 file through the file input found on this view. Once the video loads and is visible to the user, they may begin sampling audio from it at any time by clicking the "Begin Sample Capture" button. To end a sample, click the "End Sample Capture" button. 
After a sample has been captured, it may be previewed by the user to ensure they want to save it. If so, the user must assign a name to the sample, and then click the "Save Sample" button. The sample will now be visible under the "Browse Samples" tab. From there it may be loaded into the current patch to be played with by the user.





###Playing the Sampler

On the Play view, users may play back their samples by clicking the play button on any channels which have a sample loaded. Here, the users can also stop a playing sample, or loop the current sample. Beneath the play, stop, and loop buttons, each channel also has sliders which control the channel's volume, the speed/tone of the sample, a highpass filter, and a lowpass filter.
From this view, Patches can be saved by clicking the "Save Patch" button. After a patch is saved, it may be loaded in at any time by finding it in the "Patches" view.



import React from "react"
import indexStyles from './index.module.css'

const tags = ['ceiling_fan', 'breaker_box', 'sump_pump', 'washer']

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error('navigator.getUserMedia error:', e);
    const errorMsgElement = document.querySelector('span#errorMsg');

    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

async function startCamera() {
    const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
    const constraints = {
        audio: {
            echoCancellation: {exact: hasEchoCancellation}
        },
        video: {
            width: 1280, height: 720
        }
    };
    console.log('Using media constraints:', constraints);
    await init(constraints);
}

function playVideo() {
    const recordedVideo = document.querySelector('video#recorded');

    const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();  
}

function downloadVideo() {
    const blob = new Blob(recordedBlobs, {type: 'video/webm'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
}

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

let isRecording = false;
function recordCamera() {
    if (isRecording) {
        mediaRecorder.stop();
        return;
    }
    const errorMsgElement = document.querySelector('span#errorMsg');

    recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9'};
  
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
        errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
        options = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not Supported`);
            errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
            options = {mimeType: 'video/webm'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.error(`${options.mimeType} is not Supported`);
                errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
                options = {mimeType: ''};
            }
        }
    }

    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }


  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  const recordButton = document.querySelector('button#record');

  recordButton.textContent = 'Stop Recording';
  //playButton.disabled = true;
  //downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorded Blobs: ', recordedBlobs);
    console.log('Recorder stopped: ', event);
    isRecording = false;
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
  isRecording = true;
}

function handleSuccess(stream) {
  //recordButton.disabled = false;
  console.log('getUserMedia() got stream:', stream);
  window.stream = stream;

  const gumVideo = document.querySelector('video#gum');
  gumVideo.srcObject = stream;
}

export default () => 
    <div>
        <h1>Tags</h1>
        {
            tags.map(
                (tag) => <button key={tag} className={indexStyles.button}>{tag}</button>
            )
        }


        <video className={indexStyles.video} id="gum" playsInline autoPlay muted></video>
        <video className={indexStyles.video} id="recorded" playsInline loop></video>

        <div>
            <button 
                onClick={startCamera}
                className={indexStyles.button} 
                id="start">
                    Start camera
            </button>
            <button 
                onClick={recordCamera}
                className={indexStyles.button}  
                id="record" 
                /* disabled*/>Start Recording
            </button>
            <button 
                onClick={playVideo}
                className={indexStyles.button}
                id="play" 
                /*disabled*/>Play
            </button>
            <button 
                onClick={downloadVideo}
                className={indexStyles.button}  
                id="download" 
                /*disabled*/>Download
            </button>
        </div>

        <div>
            <h4>Media Stream Constraints options</h4>
            <p>Echo cancellation:
                <input type="checkbox" id="echoCancellation" />
            </p>
        </div>

        <div>
            <span id="errorMsg"></span>
        </div>

    </div>

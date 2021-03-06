import React from 'react';
import styles from './VideoRecorder.module.css';
import TagControl from './TagControl';

class VideoRecorder extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: [],
            ready: false,
            hasVideo: false
        }

        this.mediaRecorder = null;
        this.recordedBlobs = null;
        this.sourceBuffer = null;
    }

    componentDidMount() {
        this.mediaSource = new MediaSource();
        this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);
    
        this.startCamera();
    }

    handleSourceOpen(event) {
        const self = this;

        console.log('MediaSource opened');
        self.sourceBuffer = self.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
        console.log('Source buffer: ', self.sourceBuffer);
    }
  
    handleDataAvailable(event) {
        const self = this;
        if (event.data && event.data.size > 0) {
            self.recordedBlobs.push(event.data);
        }
    }
  
    error(e) {
        const errors = this.state.errors;
        errors.push(e);
        console.error(e);
        this.setState({errors});
    }

    async startCamera() {
        const self = this;

        function handleSuccess(stream) {
            //recordButton.disabled = false;
            console.log('getUserMedia() got stream:', stream);
            window.stream = stream;
  
            const gumVideo = document.querySelector('video#gum');
            gumVideo.srcObject = stream;

            self.setState({ready: true});
        }

        async function init(constraints) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                handleSuccess(stream);
            } catch (e) {
                self.error(`navigator.getUserMedia error:${e.toString()}`);
            }
        }

        const constraints = {
            audio: {
                echoCancellation: {exact: true},
                volume: 0
            },
            video: {
                width: this.props.width, 
                height: this.props.height,
                facingMode: {
                    ideal: "environment"
                }
            }
        };
        
        await init(constraints);
    }

    recordVideo() {
        const self = this;
    
        self.recordedBlobs = [];
        let options = {mimeType: 'video/webm;codecs=vp9'};
      
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            self.error(`${options.mimeType} is not Supported`);
            options = {mimeType: 'video/webm;codecs=vp8'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                self.error(`${options.mimeType} is not Supported`);
                options = {mimeType: 'video/webm'};
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    self.error(`${options.mimeType} is not Supported`);
                    options = {mimeType: ''};
                }
            }
        }
    
        try {
            self.mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e) {
            self.error(`Exception while creating MediaRecorder: ${JSON.stringify(e)}`);
            return;
        }
    
        console.log('Created MediaRecorder', self.mediaRecorder, 'with options', options);
      
        self.mediaRecorder.onstop = (event) => {
            console.log('Recorded Blobs: ', self.recordedBlobs);
            console.log('Recorder stopped: ', event);
            this.setState({recording: false, hasVideo: true});            
            this.props.onCompleteRecording(self.recordedBlobs);
        };

        self.mediaRecorder.ondataavailable = self.handleDataAvailable.bind(self);
        self.mediaRecorder.start(10); // collect 10ms of data
        
        console.log('MediaRecorder started', self.mediaRecorder);
        
        this.setState({
          recording: true
        });
    }

    stopRecording() {
        this.mediaRecorder.stop();

        this.setState({
            isRecording: false,
            hasVideo: true
        });
    }

    playVideo() {
        const self = this;
        const recordedVideo = document.querySelector('video#recorded');

        const superBuffer = new Blob(self.recordedBlobs, {type: 'video/webm'});
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.controls = true;
        recordedVideo.play();  
    }

    downloadVideo() {
        const self = this;

        const blob = new Blob(self.recordedBlobs, {type: 'video/webm'});
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

    render() {
        const self = this;

        /*<button 
            onClick={self.downloadVideo.bind(self)}
            className={styles.button}  
            id="download" 
            disabled={!this.state.hasVideo}>Download
        </button>*/
        /*<button 
            onClick={self.playVideo.bind(self)}
            className={styles.button}
            id="play" 
            disabled={!this.state.hasVideo}>Play
        </button>*/
        /*
        <video className={styles.video} id="recorded" playsInline loop></video>
        */

        return (
            <div>   
                {
                    !this.state.hasVideo ? (
                    <button 
                        onClick={
                            !self.state.recording ? 
                                self.recordVideo.bind(self) : 
                                self.stopRecording.bind(self)
                        }
                        className={styles.button}  
                        id="record" 
                        disabled={!this.state.ready}>{
                            !self.state.recording ? "Record" : "Stop"
                        }
                        </button>
                    ) : null
                }

                {
                    (this.state.hasVideo && 
                    !this.state.isRecording) ? (
                        <TagControl 
                            defaultValue={this.props.selectedTag} 
                            setTag={self.props.setTag} />
                    ) : null
                }

                <div>
                    <video className={styles.video} 
                        id="gum" 
                        playsInline 
                        autoPlay 
                        muted
                    >

                    </video>
                </div>

                <ul>
                    {
                        this.state.errors.map(
                            (e) => <li>{e}</li>
                        )
                    }
                </ul>
            </div>
        );
    }
}
       
export default VideoRecorder;
import React from 'react';
import indexStyles from './index.module.css';
import TagControl from './TagControl';
import VideoRecorder from './VideoRecorder';
import FileUpload from './FileUpload';

class VideoTagger extends React.Component {

    constructor() {
        super();

        this.state = {
            recordedBlobs: []
        }
    }

    componentDidMount() {
        this.height = document.documentElement.clientHeight;
        this.width = document.documentElement.clientWidth;

        this.setState();
    }

    onCompleteRecording(recordedBlobs) {
        this.setState({recordedBlobs});
    }

    render() {
        return (
            <div>
                <FileUpload 
                    tag={'washing_machine'} 
                    recordedBlobs={this.state.recordedBlobs}
                />
                <VideoRecorder
                    height={this.height}
                    width={this.width}
                    onCompleteRecording={this.onCompleteRecording.bind(this)}
                 />
            </div>
        );
    }
}

export default VideoTagger;
import React from 'react';
import recordStyles from './record.module.css';
import VideoRecorder from '../components/VideoRecorder';
import FileUpload from '../components/FileUpload';

class VideoTagger extends React.Component {

    constructor() {
        super();

        this.state = {
            recordedBlobs: [],
            selectedTag: null
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

    setTag(tag) {
        this.setState({selectedTag: tag});
    }

    render() {
        return (
            <div>
                {
                    this.state.recordedBlobs.length > 0 ? (
                        <FileUpload 
                            tag={this.state.selectedTag} 
                            recordedBlobs={this.state.recordedBlobs}
                        />
                    ) : null
                }
                <VideoRecorder
                    height={this.height}
                    width={this.width}
                    setTag={this.setTag.bind(this)}
                    selectedTag={this.state.selectedTag}
                    onCompleteRecording={this.onCompleteRecording.bind(this)}
                 />
            </div>
        );
    }
}

export default VideoTagger;
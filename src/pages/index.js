import React from 'react';
import indexStyles from './index.module.css';
import TagControl from './TagControl';
import VideoRecorder from './VideoRecorder';
import FileUpload from './FileUpload';

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
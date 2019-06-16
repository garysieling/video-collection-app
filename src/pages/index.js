import React from 'react';
import indexStyles from './index.module.css';
import TagControl from './TagControl';
import VideoRecorder from './VideoRecorder';
import FileUpload from './FileUpload';

class VideoTagger extends React.Component {
    componentDidMount() {
        this.height = document.documentElement.clientHeight;
        this.width = document.documentElement.clientWidth;

        this.setState();
    }

    render() {
        return (
            <div>
                <FileUpload tag={'washing_machine'} />
                <VideoRecorder
                    height={this.height}
                    width={this.width}
                 />
            </div>
        );
    }
}

export default VideoTagger;
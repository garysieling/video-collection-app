import React from 'react';
import indexStyles from './index.module.css';
import TagControl from './TagControl';
import VideoRecorder from './VideoRecorder';
import VideoUploader from './VideoUploader';

class VideoTagger extends React.Component {
    componentDidMount() {
        this.height = document.documentElement.clientHeight;
        this.width = document.documentElement.clientWidth;

        this.setState();
    }

    render() {
        return (
            <div>
                <VideoRecorder
                    height={this.height}
                    width={this.width}
                 />
                 <VideoUploader />
            </div>
        );
    }
}

export default VideoTagger;
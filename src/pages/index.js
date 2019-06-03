import React from 'react';
import indexStyles from './index.module.css';
import TagControl from './TagControl';
import VideoRecorder from './VideoRecorder';
import VideoUploader from './VideoUploader';

class VideoTagger extends React.Component {
    render() {
        /*
window.innerHeight
755
document.body.clientHeight
956
document.documentElement.clientHeight
743

<TagControl />
                
        */
        return (
            <div>
                <VideoRecorder
                    height={document.documentElement.clientHeight}
                    width={document.documentElement.clientWidth}
                 />
                 <VideoUploader />
            </div>
        );
    }
}

export default VideoTagger;
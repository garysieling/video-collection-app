import React from 'react';

class VideoList extends React.Component {

    constructor() {
        super();

        this.state = {
        }
    }

    render() {
        return (
            <ul>
                <li>
                    Video 1
                </li>
                <li>
                    Video 2
                </li>
                <li>
                    Video 3
                </li>
            </ul>
        );
    }
}

export default VideoList;
import React from 'react';

class Index extends React.Component {

    constructor() {
        super();

        this.state = {
        }
    }

    render() {
        return (
            <ul>
                <li>
                    <a href="/list">List</a>
                </li>
                <li>
                    <a href="/viewer">Viewer</a>
                </li>
                <li>
                    <a href="/record">Record</a>
                </li>
            </ul>
        );
    }
}

export default Index;
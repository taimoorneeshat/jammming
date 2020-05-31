import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.trackName = '';
        this.trackArtist = '';
        this.trackAlbum = '';
        this.isRemoval = '';
    }

    renderAction() {
        return this.isRemoval ? '-' : '+';
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.trackName}</h3>
                    <p>{this.trackArtist} | {this.trackAlbum}</p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }
}

export default Track;
import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(t => <Track key={t.id} track={t} onAdd={this.props.onAdd}/>)}
            </div>
        );
    }
}

export default TrackList;
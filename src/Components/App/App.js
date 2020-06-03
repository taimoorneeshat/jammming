import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
          id: 1,
          name: 'One',
          artist: 'Yo',
          album: 'Yola'
        }, {
          id: 2,
          name: 'Two',
          artist: 'Yo',
          album: 'Yola'
        }, {
          id: 3,
          name: 'Three',
          artist: 'Yo',
          album: 'Yola'
        }
      ],
      playlistTracks: [{
          id: 1,
          name: 'Once',
          artist: 'Yo',
          album: 'Yola'
        }, {
          id: 4,
          name: 'Twice',
          artist: 'Yo',
          album: 'Yola'
        }, {
          id: 5,
          name: 'Thrice',
          artist: 'Yo',
          album: 'Yola'
        }
      ],
      playlistName: 'Play'
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(t => track.id === t.id)) {
      return;
    } else {
      this.state.playlistTracks.push(track);
    }
  }

  removeTrack(track) {
    this.setState({ playlistTracks: this.state.playlistTracks.filter(t => t.id !== track.id)});
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar/>
          <div class="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist palylistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

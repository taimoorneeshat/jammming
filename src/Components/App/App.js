import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

let playlistName = 'Play';
let playlistTracks = [{
    id: 1,
    name: 'Once',
    artist: 'Yo',
    album: 'Yola'
  }, {
    id: 1,
    name: 'Twice',
    artist: 'Yo',
    album: 'Yola'
  }, {
    id: 1,
    name: 'Thrice',
    artist: 'Yo',
    album: 'Yola'
  }
];

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
          id: 1,
          name: 'Two',
          artist: 'Yo',
          album: 'Yola'
        }, {
          id: 1,
          name: 'Three',
          artist: 'Yo',
          album: 'Yola'
        }
      ]
    }
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar/>
          <div class="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist palylistName={playlistName} playlistTracks={playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

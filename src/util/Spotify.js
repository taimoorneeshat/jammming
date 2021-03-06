const clientId = 'd563da9debf24fefb96e918237a3135b';
const redirectURI = 'http://jammmy.surge.sh/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 
        
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(term) {
        const accessToken = this.getAccessToken();
        let endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(repsonse => {
            if (repsonse.ok) {
                return repsonse.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(t => ({
                    id: t.id,
                    name: t.name,
                    artist: t.artists[0].name,
                    album: t.album.name,
                    uri: t.uri
            }))
        })
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) {
            return;
        }
        const accessToken = this.getAccessToken();
        const headers = { Authorization: 'Bearer ' + accessToken };
        let userId;

        fetch('https://api.spotify.com/v1/me', { headers: headers}).then(repsonse => repsonse.json(), 
            networkError => { 
                console.log(networkError.message);
        }).then(jsonResponse => {
            userId = jsonResponse.id;
            console.log(userId);
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName})
            });
        }).then(repsonse => repsonse.json()).then(jsonResponse => {
            let playlistId = jsonResponse.id;
            console.log(playlistId);
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs })
            });
        });
    }
}

export default Spotify;
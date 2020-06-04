const clientID = 'd563da9debf24fefb96e918237a3135b';
const redirectURI = 'http://localhost:3000';
let accessToken = '';

const Spotify = {
    getAccessToken: function() {
        if (accessToken) {
            return accessToken;
        } else if (window.location.href.match('/access_token=([^&]*)/')) {
            accessToken = window.location.href.match('/access_token=([^&]*)/');
            let expiresIn = window.location.href.match('/expires_in=([^&]*)/');
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    }
}

export default Spotify;
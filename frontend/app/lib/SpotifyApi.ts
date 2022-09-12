import axios from 'axios';
import { UserInfo } from '../types/userinfo';
import { SpotifyPlaylist } from '../types/playlist';

export class SpotifyApi {

    access_token: string;
    base_url: string = 'https://api.spotify.com/v1';
    headers: {
        'Content-Type': string,
        'Authorization': string
    };

    constructor(access_token: string) {
        this.access_token = access_token;

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.access_token}`,
        };
    }

    async getUserInfo() {
      return await axios.get(
        `${this.base_url}/me`,
        { headers: this.headers }
      ).then((res) => {
        var data: UserInfo = res.data;
        return data;
      }).catch((error) => {
        return error.response.data;
      });
    }

    async searchItem(query: string){
      return await axios.get(
        `${this.base_url}/search?${query}`,
        { headers: this.headers }
      ).then((res) => {
        return res.data.tracks.items;
      }).catch((error) => {
          return error.response.data;
      });
    }

    async getPlaylist(playlist_id: string) {
      return await axios.get(
        `${this.base_url}/playlists/${playlist_id}`,
        { headers: this.headers }
      ).then((res) => {
        var data: SpotifyPlaylist = res.data;
        return data;
      }).catch((error) => {
        return error.response.data;
      });
    }

    async getUserPlaylists() {
      return await axios.get(
        `${this.base_url}/me/playlists`,
        { headers: this.headers }
      ).then((res) => {
        var playlists: Array<SpotifyPlaylist> = res.data.items;
        return playlists;
      }).catch((error) => {
        return error.response.data;
      });
    }

}
import axios from 'axios';
import { UserInfo } from '../types/userinfo';
import { SpotifyApiTrack } from '../types/track';
import { 
  SpotifyPlaylist, CreateSpotifyPlaylistParam, 
  AddItemToSpotifyPlaylistParam 
} from '../types/playlist';

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
      let response: {
        status: number,
        errorMsg: string,
        data: SpotifyApiTrack | undefined
      }

      return await axios.get(
        encodeURI(`${this.base_url}/search?${query}`),
        { headers: this.headers }
      ).then((res) => {
        response = {
          status: 200,
          errorMsg: "",
          data: res.data.tracks.items
        };
        return response;
      }).catch((error) => {
        const status_code: number = error.response ? error.response.status : 500;
        response = {
          status: status_code,
          errorMsg: error.message,
          data: undefined
        };
        return response;
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

    async createUserPlaylist(param: CreateSpotifyPlaylistParam) {
      let data = {
        name: param.playlist_name,
        public: param.public,
        collaborative: param.collaborative,
        description: param.description
      }
      return await axios.post(
        `${this.base_url}/users/${param.user_id}/playlists`,
        data,
        { headers: this.headers }
      ).then((res) => {
        var playlists: SpotifyPlaylist = res.data;
        return playlists;
      }).catch((error) => {
        return error.response.data;
      });
    }

    async addItemToPlaylist(param: AddItemToSpotifyPlaylistParam) {
      let data = {
        position: param.position,
        uris: param.uris
      }
      return await axios.post(
        `${this.base_url}/playlists/${param.playlist_id}/tracks`,
        data,
        { headers: this.headers }
      ).then((res) => {
        var snapshot_id: string = res.data;
        return snapshot_id;
      }).catch((error) => {
        return error.response.data;
      });
    }

}
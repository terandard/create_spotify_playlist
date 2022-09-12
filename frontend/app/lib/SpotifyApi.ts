import axios from 'axios';
import { SpotifyPlaylist } from '../types/playlist';

export type UserInfo = {
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
      filter_enabled: boolean,
      filter_locked: boolean
    },
    external_urls: {
      spotify: string
    },
    followers: {
      href: string,
      total: number
    },
    href: string,
    id: string,
    images: [
      {
        url: string,
        height: number,
        width: number
      }
    ],
    product: string,
    type: string,
    uri: string
}


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
            return res.data;
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
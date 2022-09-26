import axios, { AxiosError } from 'axios';
import { UserInfo } from '../types/userinfo';
import { SpotifyApiTrack } from '../types/track';
import { 
  SpotifyPlaylist, CreateSpotifyPlaylistParam, 
  AddItemToSpotifyPlaylistParam 
} from '../types/playlist';

type Response = {
  status: number,
  errorMsg: string,
  data: any
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

    makeErrorResponse(error: AxiosError) {
      const status_code: number = error.response ? error.response.status : 500;
      const response: Response = {
        status: status_code,
        errorMsg: error.message,
        data: undefined
      };
      return response;
    }

    async getUserInfo() {
      let response: Response & {data: UserInfo | undefined};

      return await axios.get(
        `${this.base_url}/me`,
        { headers: this.headers }
      ).then((res) => {
        response = {
          status: 200,
          errorMsg: "",
          data: res.data
        }
        return response;
      }).catch((error) => {
        response = this.makeErrorResponse(error);
        return response;
      });
    }

    async searchItem(query: string){
      let response: Response & {data: SpotifyApiTrack | undefined};

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
        response = this.makeErrorResponse(error);
        return response;
      });
    }

    async getPlaylist(playlist_id: string) {
      let response: Response & {data: SpotifyPlaylist | undefined};

      return await axios.get(
        `${this.base_url}/playlists/${playlist_id}`,
        { headers: this.headers }
      ).then((res) => {
        response = {
          status: 200,
          errorMsg: "",
          data: res.data
        };
        return response;
      }).catch((error) => {
        response = this.makeErrorResponse(error);
        return response;
      });
    }

    async getUserPlaylists() {
      let response: Response & {data: Array<SpotifyPlaylist> | undefined};

      return await axios.get(
        `${this.base_url}/me/playlists`,
        { headers: this.headers }
      ).then((res) => {
        response = {
          status: 200,
          errorMsg: "",
          data: res.data.items
        };
        return response;
      }).catch((error) => {
        response = this.makeErrorResponse(error);
        return response;
      });
    }

    async createUserPlaylist(param: CreateSpotifyPlaylistParam) {
      let response: Response & {data: SpotifyPlaylist | undefined};

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
        response = {
          status: 200,
          errorMsg: "",
          data: res.data
        };
        return response;
      }).catch((error) => {
        response = this.makeErrorResponse(error);
        return response;
      });
    }

    async addItemToPlaylist(param: AddItemToSpotifyPlaylistParam) {
      let response: Response & {data: string | undefined};

      let data = {
        position: param.position,
        uris: param.uris
      }
      return await axios.post(
        `${this.base_url}/playlists/${param.playlist_id}/tracks`,
        data,
        { headers: this.headers }
      ).then((res) => {
        response = {
          status: 200,
          errorMsg: "",
          data: res.data
        };
        return response;
      }).catch((error) => {
        response = this.makeErrorResponse(error);
        return response;
      });
    }

}
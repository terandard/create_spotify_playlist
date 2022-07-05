import axios from 'axios';

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
        var track_responses = res.data.tracks.items.map((d) => {
          return {
            track_id: d.id,
            track_name: d.name,
            artist_name: d.artists[0].name,
            artist_id: d.artists[0].id,
          }
        });
        return track_responses;
      }).catch((error) => {
          return error.response.data;
      });


    }
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyApi } from '../../lib/SpotifyApi';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';
import { SpotifyPlaylist, CreateSpotifyPlaylistParam, AddItemToSpotifyPlaylistParam } from '../../types/playlist';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token: string = req.session.user.accessToken;
    const user_id: string = req.session.user.id;
    const spotifyApi = new SpotifyApi(access_token);

    const create_param: CreateSpotifyPlaylistParam = {
        user_id: user_id,
        playlist_name: req.body.playlistTitle,
        public: true,
        collaborative: false,
        description: req.body.playlistDescription
    }

    let playlist_id: string;
    spotifyApi.createUserPlaylist(create_param)
    .then((response) => {
        if(response.status != 200) throw new Error("createUserPlaylist: " + response.errorMsg);
        playlist_id = response.data.playlist.id;
        const add_param: AddItemToSpotifyPlaylistParam = {
            playlist_id: playlist_id,
            position: 0,
            uris: req.body.uris
        }
        return spotifyApi.addItemToPlaylist(add_param)
    }).then((response) => {
        if (response.status != 200) throw new Error("addItemToPlaylist: " + response.errorMsg);
        res.status(200).json({playlist_id: playlist_id})    
    }).catch((e) => {
        res.status(400).json({errorMsg: e.message})
    })

}

export default withIronSessionApiRoute(handler, ironOptions)
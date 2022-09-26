import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyApi } from '../../lib/SpotifyApi';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';
import { SpotifyPlaylist, CreateSpotifyPlaylistParam } from '../../types/playlist'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token: string = req.session.user.accessToken;
    const user_id: string = req.session.user.id;
    const spotifyApi = new SpotifyApi(access_token);

    let param: CreateSpotifyPlaylistParam = {
        user_id: user_id,
        playlist_name: req.body.name,
        public: true,
        collaborative: false,
        description: req.body.description
    }

    const response = await spotifyApi.createUserPlaylist(param);
    res.json(response)
}

export default withIronSessionApiRoute(handler, ironOptions)
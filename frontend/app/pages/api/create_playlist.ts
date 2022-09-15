import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyApi } from '../../lib/SpotifyApi';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';
import { SpotifyPlaylist, CreateSpotifyPlaylistParam } from '../../types/playlist'
import { UserInfo } from "../../types/userinfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token: string = req.session.user.accessToken;
    const spotifyApi = new SpotifyApi(access_token);
    const userinfo: UserInfo = await spotifyApi.getUserInfo();

    let param: CreateSpotifyPlaylistParam = {
        user_id: userinfo.id,
        playlist_name: req.body.name,
        public: true,
        collaborative: false,
        description: req.body.description
    }

    const playlist: SpotifyPlaylist = await spotifyApi.createUserPlaylist(param);
    res.status(200).json({ playlist })
}

export default withIronSessionApiRoute(handler, ironOptions)
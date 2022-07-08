import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyApi } from '../../lib/SpotifyApi';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token: string = req.session.user.accessToken;
    const spotifyApi = new SpotifyApi(access_token);
    const tracks = await spotifyApi.searchItem("q=track:BEK+artist:SHADOWS&type=track");
    res.status(200).json({ tracks })
}

export default withIronSessionApiRoute(handler, ironOptions)
import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyApi } from '../../lib/SpotifyApi';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token: string = req.session.user.accessToken;
    const spotifyApi = new SpotifyApi(access_token);

    var query: string = "q=";
    var q_track = req.body.trackKeyword ? 'track:' + req.body.trackKeyword : '';
    var q_artist = req.body.artist ? '+artist:' + req.body.artist : '';

    query += q_track + q_artist + "&type=track";

    const tracks = await spotifyApi.searchItem(query);
    res.status(200).json({ tracks })
}

export default withIronSessionApiRoute(handler, ironOptions)
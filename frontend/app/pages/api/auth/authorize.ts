import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from "../../../lib/config";


type SpotifyAuthApiResponse = {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
}

const authorize = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code, state } = req.query;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', process.env.REDIRECT_URI as string);

    const response = await axios.post<SpotifyAuthApiResponse>(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, 'utf-8').toString('base64')}`
            }
        }
    );

    req.session.user = {
        accessToken: response.data.access_token,
    };
    await req.session.save();
    res.status(200).redirect('/user');
};

export default withIronSessionApiRoute(authorize, ironOptions);

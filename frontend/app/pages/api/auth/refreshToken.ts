import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from "../../../lib/config";

const authorize = async (req: NextApiRequest, res: NextApiResponse) => {
    let user = req.session.user;

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', user.refreshToken);

    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, 'utf-8').toString('base64')}`
            }
        }
    );

    req.session.user.accessToken = response.data.access_token;
    await req.session.save();
    res.status(200).json({status: "ok"});
};

export default withIronSessionApiRoute(authorize, ironOptions);

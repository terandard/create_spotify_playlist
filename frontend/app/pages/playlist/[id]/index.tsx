import { GetServerSidePropsContext } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import { SpotifyApi } from "../../../lib/SpotifyApi";
import { SpotifyPlaylist } from '../../../types/playlist';
import Images from "../../../components/images";

type PropsData = {
    error: { statusCode: number, errorMsg: string } | null,
    playlist: SpotifyPlaylist
}

export default function DetailPlaylist({playlist}: PropsData) {

    return (
        <main>
            <h2>{playlist.name}</h2>
            <Images images={playlist.images} description={playlist.name} size="large" />
            {playlist.tracks.items.map((i) => (
                <div key={i.track.id}>
                    <p>{i.track.name}</p>
                    <p>
                        {i.track.artists.map((a) => (
                            <span key={a.id}>{a.name}</span>
                        ))}
                    </p>
                </div>
            ))}
        </main>
    )

}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context: GetServerSidePropsContext) {
        const user = context.req.session.user;
        const id: string = context.query.id as string
        const spotifyApi = new SpotifyApi(user.accessToken);

        const props: PropsData = await spotifyApi.getPlaylist(id)
            .then((res) => {
                if(res.status != 200) return {
                    error: {statusCode: res.status, errorMsg: res.errorMsg},
                    playlist: res.data
                };

                return {
                    error: null,
                    playlist: res.data
                }
            })

        return { props: props }
    }, ironOptions
  );
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { SpotifyPlaylist } from "../../types/playlist";
import Images from "../../components/images";
import Header from "../../components/header";
import Link from 'next/link'

type PropsData = {
    error: { statusCode: number, errorMsg: string },
    userPlaylists: Array<SpotifyPlaylist>
}

export default function ShowUserPlaylists(props: PropsData) {
    return (
        <main>
            <Header />
            <h2>プレイリスト一覧</h2>
            <div>
                {props.userPlaylists.map((p) => (
                    <div key={p.id}>
                        <Link href={"/playlist/"+p.id}>
                            {p.name}
                        </Link>
                        <Images images={p.images} description={p.name}/>
                    </div>
                ))}

            </div>
        </main>
    )
}


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;
        const spotifyApi = new SpotifyApi(user.accessToken);
        const res = await spotifyApi.getUserPlaylists();

        const props: PropsData = {
            error: {statusCode: res.status, errorMsg: res.errorMsg},
            userPlaylists: res.data
        }

        return { props: props }
    }, ironOptions
  );
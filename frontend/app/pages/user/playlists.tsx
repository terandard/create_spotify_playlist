import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { SpotifyPlaylist } from "../../types/playlist";
import Images from "../../components/images";
import Link from 'next/link'

type PropsData = {
    error: { statusCode: number, errorMsg: string } | null,
    userPlaylists: Array<SpotifyPlaylist>
}

export default function ShowUserPlaylists(props: PropsData) {
    return (
        <main>
            <h2>プレイリスト一覧</h2>
            <div>
                {props.userPlaylists.map((p) => (
                    <div key={p.id}>
                        <Link href={"/playlist/"+p.id}>
                            {p.name}
                        </Link>
                        <Images images={p.images} description={p.name} size="large" />
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
        const props: PropsData = await spotifyApi.getUserPlaylists()
            .then((res) => {
                if (res.status != 200) return {
                    error: {statusCode: res.status, errorMsg: res.errorMsg},
                    userPlaylists: res.data
                };

                return {
                    error: null,
                    userPlaylists: res.data
                }
            });
        console.log(props)

        return { props: props }
    }, ironOptions
  );
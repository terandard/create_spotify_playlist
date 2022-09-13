import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { SpotifyPlaylist } from "../../types/playlist";
import Images from "../../components/images";

type PropsData = {
    userPlaylists: Array<SpotifyPlaylist>
}

export default function ShowUserPlaylists(props: PropsData) {
    return (
        <main>
            <h2>プレイリスト一覧</h2>
            <div>
                {props.userPlaylists.map((p) => (
                    <div key={p.id}>
                        <p>{p.name}</p>
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
      const user_playlists: Array<SpotifyPlaylist> = await spotifyApi.getUserPlaylists();

      const props: PropsData = {
        userPlaylists: user_playlists
      }

      return { props: props }
    }, ironOptions
  );
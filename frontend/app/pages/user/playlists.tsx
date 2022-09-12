import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { SpotifyPlaylist } from "../../types/playlist";

type PropsData = {
    userPlaylists: Array<SpotifyPlaylist>
}

export default function ShowUserPlaylists(props: PropsData) {
    return (
        <main>
            <h2>プレイリスト一覧</h2>
            <div>
                <ul>
                    {props.userPlaylists.map((p) => (
                        <li key={p.id}>{p.name}</li>
                    ))}
                </ul>

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
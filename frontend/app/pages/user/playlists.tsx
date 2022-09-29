import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { SpotifyPlaylist } from "../../types/playlist";
import { useRouter } from 'next/router';
import Images from "../../components/images";
import styles from '../../styles/Playlist.module.scss';

type PropsData = {
    error: { statusCode: number, errorMsg: string } | null,
    userPlaylists: Array<SpotifyPlaylist>
}

export default function ShowUserPlaylists(props: PropsData) {
    const router = useRouter();

    const moveDetail = (playlist_id: string) => {
        router.push("/playlist/" + playlist_id);
    }

    return (
        <div>
            <h2>プレイリスト一覧</h2>
            <div className={styles.playlist__wrapper}>
                {props.userPlaylists.map((p) => (
                    <div className={styles['playlist__item--wrapper']} 
                        key={p.id} 
                        onClick={() => moveDetail(p.id)} >
                        
                        <Images images={p.images} description={p.name} size="large" />
                        <p className={styles['playlist__item--title']}>
                            {p.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
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
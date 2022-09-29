import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { UserInfo } from "../../types/userinfo";
import { useRouter } from 'next/router';
import Images from "../../components/images";
import styles from "../../styles/User.module.scss";

type PropsData = {
    error: { statusCode: number, errorMsg: string } | null,
    userInfo: UserInfo,
}

export default function ShowUserInfo({userInfo}: PropsData) {
    const router = useRouter();

    const movePlaylist = () => {
        router.push("/user/playlists")
    }

    const moveCreate = () => {
        router.push("/get_setlist")
    }

    return (
        <div>
            <h1>Logged in as {userInfo.display_name}</h1>
            <div className={styles.user__wrapper}>
                <Images images={userInfo.images} description={userInfo.display_name} size="large" />
                <button
                    onClick={() => movePlaylist()} 
                    className={`${styles.user__button} ${styles.user__playlist}`}>
                    プレイリスト一覧
                </button>
                <button
                    onClick={() => moveCreate()} 
                    className={`${styles.user__button} ${styles.user__create}`}>
                    プレイリスト作成
                </button>
            </div>
        </div>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;
        const spotifyApi = new SpotifyApi(user.accessToken);
        const props: PropsData = await spotifyApi.getUserInfo()
            .then(async (res) => {
                if(res.status != 200) return {
                    error: {statusCode: res.status, errorMsg: res.errorMsg},
                    userInfo: res.data
                };

                req.session.user.id = res.data.id;
                await req.session.save();
    
                return {
                    error: null,
                    userInfo: res.data
                }
            })

        return { props: props }
    }, ironOptions
  );
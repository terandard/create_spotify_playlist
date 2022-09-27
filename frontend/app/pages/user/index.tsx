import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { SpotifyApi } from "../../lib/SpotifyApi";
import { UserInfo } from "../../types/userinfo";
import Images from "../../components/images";

type PropsData = {
    error: { statusCode: number, errorMsg: string } | null,
    userInfo: UserInfo,
}

export default function ShowUserInfo(props: PropsData) {
    var user_info: UserInfo = props.userInfo;
    return (
        <main>
            <h1>Logged in as {user_info.display_name}</h1>
            <div className="media">
                <div className="pull-left">
                    <Images images={user_info.images} description={user_info.display_name}/>
                </div>
                <div className="media-body">
                    <dl className="dl-horizontal">
                        <dt>Display name</dt><dd className="clearfix">{user_info.display_name}</dd>
                        <dt>Id</dt><dd>{user_info.id}</dd>
                        <dt>Email</dt><dd>{user_info.email}</dd>
                        <dt>Spotify URI</dt><dd><a href="{external_urls.spotify}">{user_info.external_urls.spotify}</a></dd>
                        <dt>Link</dt><dd><a href="{{href}}">{user_info.href}</a></dd>
                        <dt>Profile Image</dt><dd className="clearfix"><a href="{{images.0.url}}"></a></dd>
                        <dt>Country</dt><dd>{user_info.country}</dd>
                    </dl>
                </div>
            </div>
        </main>
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
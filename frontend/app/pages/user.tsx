import {Data} from "./api/hello";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/config";
import { SpotifyApi, UserInfo } from "../lib/SpotifyApi";

export default function ShowUserInfo(userinfo) {
    return (
        <main>
            <h1>Logged in as {userinfo.display_name}</h1>
            <div className="media">
                <div className="pull-left">
                    <img className="media-object" width="150" src="{{images.0.url}}" />
                </div>
                <div className="media-body">
                    <dl className="dl-horizontal">
                        <dt>Display name</dt><dd className="clearfix">{userinfo.display_name}</dd>
                        <dt>Id</dt><dd>{userinfo.id}</dd>
                        <dt>Email</dt><dd>{userinfo.email}</dd>
                        <dt>Spotify URI</dt><dd><a href="{external_urls.spotify}">{userinfo.external_urls.spotify}</a></dd>
                        <dt>Link</dt><dd><a href="{{href}}">{userinfo.href}</a></dd>
                        <dt>Profile Image</dt><dd className="clearfix"><a href="{{images.0.url}}"></a></dd>
                        <dt>Country</dt><dd>{userinfo.country}</dd>
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
      const userinfo = await spotifyApi.getUserInfo();

      return { props: userinfo }
    }, ironOptions
  );
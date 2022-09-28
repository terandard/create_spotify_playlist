import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next'
import React, {useCallback} from "react";
import styles from '../styles/Home.module.scss'

const Custom403: NextPage = ({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const login = useCallback(() => {
        window.location.href = loginPath;
      }, [loginPath]);

    return (
        <div>
            <p>まずはログインしてください。</p>
            <div className={styles.button__wrapper}>
            <button className={styles.button} onClick={login}>
                ログイン
            </button>
          </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    // https://accounts.spotify.com/authorizeへのリクエストパラメータに必要な項目を設定
    const scopes = ['streaming', 'user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'];
    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID || '');
    params.append('response_type', 'code');
    params.append('redirect_uri', process.env.REDIRECT_URI || '');
    params.append('scope', scopes.join(' '));
    params.append('state', 'state');
    return {
        props: { loginPath: `https://accounts.spotify.com/authorize?${params.toString()}` }
    }
  };
  

export default Custom403
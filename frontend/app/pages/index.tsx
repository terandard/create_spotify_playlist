import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useCallback } from 'react'

const Home: NextPage = ({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const login = useCallback(() => {
      window.location.href = loginPath;
    }, [loginPath]);

  return (
    <div className={styles.container}>
      <Head>
        <title>プレイリスト作成ツール（Spotify）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          プレイリスト作成ツール（Spotify）
        </h1>

        <div>
          <p>
            <a className={styles.link} href='https://www.livefans.jp/'>livefans</a>
            に登録されているセットリストから、Spotifyのプレイリストを作成するツールです。
          </p>
          <p>まずはSpotifyでログインをしてください。</p>
          <div className={styles.button__wrapper}>
            <button className={styles.button} onClick={login}>
                ログイン
            </button>
          </div>
        </div>        
      </main>
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

export default Home

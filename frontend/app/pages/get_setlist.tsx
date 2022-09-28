import React, {useState, FormEvent} from "react";
import { PlaylistFromScraping } from "../types/playlist";
import { useRouter } from 'next/router';
import Loading from '../components/loading';
import ShowTrack from "../components/tracks";
import styles from "../styles/GetSetlist.module.scss"

export default function GetSetlist() {
    const [scrapingData, setScrapingData] = useState<PlaylistFromScraping>();
    const [url, setUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [playlistTitle, setPlaylistTitle] = useState<string>("")
    const [playlistDescription, setPlaylistDescription] = useState<string>("")
    const [createErrorMsg, setCreateErrorMsg] = useState<string>("");
    const router = useRouter();

    const fetchItems = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // ruby-apiを直接呼び出すと ERR_NAME_NOT_RESOLVED となったので、
        // api経由で呼び出す
        const api_url: string = '/api/getSetlist?url=' + url;

        fetch(api_url)
        .then((res) => res.json())
        .then((res: PlaylistFromScraping) => {
            setScrapingData(res);
            setPlaylistTitle(res.event_title + res.event_subtitle)
            setIsLoading(false);
        })
    }

    const createPlaylist = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const uris = scrapingData?.tracks.map((t) => {
            return t.uri
        });

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playlistTitle: playlistTitle,
                playlistDescription: playlistDescription,
                uris: uris
            }),
        }

        const response = await fetch('/api/createPlaylistFromScraping', options)
            .then(res => res.json());

        if (response.status == 200) {
            router.push("/playlist/" + response.playlist_id)
        } else {
            setCreateErrorMsg(response.errorMsg);
        }

        setIsLoading(false);
    }

    return (
        <div>
            <Loading isLoading={isLoading} />
            <form className={styles.create__form} onSubmit={(e) => fetchItems(e)}>
                <a className={styles.create__link} href='https://www.livefans.jp/'>livefans</a>
                でセットリストページのURLを取得してください
                <p className={styles.create__label}>
                    セットリストURL（event/○○○○○○）
                </p>
                <input 
                    className={styles.create__input}
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} />
                <div className={styles['create__button--wrapper']}>
                    <button className={styles.create__button} type="submit">
                        Submit
                    </button>
                </div>
            </form>

            <div className={`${styles.create} ${!scrapingData ? styles.create__hidden : ''}`}>
                <form className={styles.create__form} onSubmit={(e) => createPlaylist(e)}>
                    <p className={styles.create__label}>プレイリスト名</p>
                    <input 
                        className={styles.create__input} 
                        type="text" 
                        value={playlistTitle} 
                        onChange={(e) => setPlaylistTitle(e.target.value)} />
                    <p className={styles.create__label}>プレイリスト説明文</p>
                    <input
                        className={styles.create__input} 
                        type="text" 
                        value={playlistDescription} 
                        onChange={(e) => setPlaylistDescription(e.target.value)} />
                    <div className={styles['create__button--wrapper']}>
                        <button className={styles.create__button} type="submit">
                            プレイリスト作成！
                        </button>
                    </div>
                </form>

                <p>{createErrorMsg}</p>

                {scrapingData?.tracks.map((t, i) => (
                    <ShowTrack key={t.id} track={t} index={(i+1).toString()} />
                ))}
            </div>
        </div>
    )
}
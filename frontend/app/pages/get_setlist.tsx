import React, {useState, FormEvent} from "react";
import { PlaylistFromScraping } from "../types/playlist";
import { useRouter } from 'next/router';
import Loading from '../components/loading';

export default function GetSetlist() {
    const [scrapingData, setScrapingData] = useState<PlaylistFromScraping>();
    const [url, setUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [playlistTitle, setPlaylistTitle] = useState<string>("")
    const [playlistDescription, setPlaylistDescription] = useState<string>("")    
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

        console.log(uris)

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

        const response = await fetch('/api/createPlaylistFromScraping', options);
        const result = await response.json();
        console.log(result);

        router.push("/playlist/" + result.playlist_id)

        setIsLoading(false);
    }

    return (
        <div>
            <Loading isLoading={isLoading} />
            <form onSubmit={(e) => fetchItems(e)}>
                <label>URL : </label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <div>
                <p>Event title : {scrapingData?.event_title}</p>
                <p>Event subtitle : {scrapingData?.event_subtitle}</p>

                <form onSubmit={(e) => createPlaylist(e)}>
                    <label>Playlist title</label>
                    <input type="text" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} />
                    <label>Playlist description</label>
                    <input type="text" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />
                    <button type="submit">Create playlist</button>
                </form>

                {scrapingData?.tracks.map((t, index) => (
                    <p key={index}>{index+1}. {t.name}</p>
                ))}
            </div>
        </div>
    )
}
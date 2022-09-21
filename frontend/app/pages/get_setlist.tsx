import React, {useState, FormEvent} from "react";
import { PlaylistFromScraping } from "../types/playlist";

export default function GetSetlist() {
    const [scrapingData, setScrapingData] = useState<PlaylistFromScraping>();
    const [url, setUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchItems = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // ruby-apiを直接呼び出すと ERR_NAME_NOT_RESOLVED となったので、
        // api経由で呼び出す
        const api_url: string = '/api/getSetlist?url=' + url;

        fetch(api_url)
        .then((res) => res.json())
        .then((res) => {
            setScrapingData(res);
            setIsLoading(false);
        })
    }

    return (
        <div>
            <form onSubmit={(e) => fetchItems(e)}>
                <label>URL : </label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <div>
                <p>Event title : {scrapingData?.event_title}</p>
                <p>Event subtitle : {scrapingData?.event_subtitle}</p>
                {scrapingData?.tracks.map((t, index) => (
                    <p key={index}>{index+1}. {t.name}</p>
                ))}
            </div>
        </div>
    )
}
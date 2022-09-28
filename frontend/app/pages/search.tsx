import React, {useState, FormEvent} from "react";
import { SpotifyApiTrack, Track } from "../types/track";
import Images from "../components/images";
import Loading from "../components/loading";

const SearchTrack = () => {

    const [tracks, setTracks] = useState<Array<Track>>([]);
    const [trackKeyword, setTrackKeyword] = useState<string>("");
    const [artist, setArtist] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchItems = async (e: FormEvent<HTMLFormElement>) => {
        if (!trackKeyword && !artist) {
            alert('please enter query');
            return
        }
        e.preventDefault();
        setIsLoading(true);

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trackKeyword: trackKeyword,
                artist: artist
            }),
        }

        const response = await fetch('/api/search', options)
            .then(res => res.json());

        if (response.status == 200) {
            const res_tracks :Array<SpotifyApiTrack> = response.data;
            if (res_tracks.length == 0) {
                setErrorMsg("曲が見つかりませんでした。")
            } else {
                setTracks(
                    res_tracks.map<Track>((t) => {
                        return {
                            album: t.album,
                            artists: t.artists,
                            id: t.id,
                            name: t.name,
                            href: t.href,
                            uri: t.uri
                        }
                    })
                )    
            }
        } else {
            if (response.status == 401) {
                setErrorMsg("セッション有効時間外です。再ログインしてください。")
            } else {
                setErrorMsg(response.errorMsg)
            }
        }

        setIsLoading(false);
    }

    
    return (
        <main>
            <Loading isLoading={isLoading} />
            <form onSubmit={(e) => fetchItems(e)}>
                <label>track:</label>
                <input type="text" value={trackKeyword} onChange={(e) => setTrackKeyword(e.target.value)} />
                <label>artist:</label>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <p>{errorMsg}</p>

            <div>
                {tracks.map((t) => (
                    <div key={t.id}>
                        <p>{t.name}</p>
                        <Images images={t.album.images} description={t.album.name} size="small" />
                    </div>
                ))}
            </div>
        </main>
    )
}


export default SearchTrack
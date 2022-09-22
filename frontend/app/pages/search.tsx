import React, {useState, FormEvent} from "react";
import { SpotifyApiTrack, Track } from "../types/track";
import Images from "../components/images";
import Loading from "../components/loading";

const SearchTrack = () => {

    const [tracks, setTracks] = useState<Array<Track>>([]);
    const [trackKeyword, setTrackKeyword] = useState<string>("");
    const [artist, setArtist] = useState<string>("");
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

        const response = await fetch('/api/search', options);
        const result = await response.json();
        const res_tracks :Array<SpotifyApiTrack> = result.tracks;
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

            <div>
                {tracks.map((t) => (
                    <div key={t.id}>
                        <p>{t.name}</p>
                        <Images images={t.album.images} description={t.album.name} />
                    </div>
                ))}
            </div>
        </main>
    )
}


export default SearchTrack
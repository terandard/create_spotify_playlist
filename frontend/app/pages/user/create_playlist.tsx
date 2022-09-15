import React, {useState, FormEvent} from "react";
import { SpotifyPlaylist } from "../../types/playlist";
import Router from 'next/router'

export default function CreatePlaylist() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description
            }),
        }
        const response = await fetch('/api/create_playlist', options);
        const result = await response.json();
        const playlist :SpotifyPlaylist = result.playlist;
        Router.push("/playlist/" + playlist.id)        
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <label>playlist name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                <label>description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
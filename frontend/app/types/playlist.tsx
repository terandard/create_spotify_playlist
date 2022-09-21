import { SpotifyImage } from "./image"
import { SpotifyApiTrack, Track } from "./track"

export interface SpotifyPlaylist {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: number
    },
    href: string,
    id: string,
    images: Array<SpotifyImage>,
    name: string,
    owner: {
        external_urls: {
            spotify: string
        },
        followers: {
            href: string,
            total: number
        },
        href: string,
        id: string,
        type: string,
        uri: string,
        display_name: string
    },
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        items: [
            {
                added_at: Date,
                added_by: {
                    external_urls: [{ spotify: string }],
                    href: string,
                    id: string,
                    type: string,
                    uri: string
                },
                is_local: boolean,
                primary_color: string,
                track: SpotifyApiTrack,
                video_thumbnail: { url: string }
            }
        ],
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number
    },
    type: string,
    uri: string
}

export type CreateSpotifyPlaylistParam = {
    user_id: string,
    playlist_name: string,
    public: boolean,
    collaborative: boolean,
    description: string
}

export type AddItemToSpotifyPlaylistParam = {
    playlist_id: string,
    position: number,
    // 配列だが複数曲追加する際はカンマ区切りで1つの文字列として渡す
    // e.g. "spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M"
    uris: Array<string>
}

export type PlaylistFromScraping = {
    event_title: string,
    event_subtitle: string,
    tracks: Array<Track>
}
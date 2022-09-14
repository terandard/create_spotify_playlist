import { SpotifyImage } from "./image"
import { SpotifyApiTrack } from "./track"

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
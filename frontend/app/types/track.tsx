import { SpotifyImage } from "./image"

export type Track = Pick<
    SpotifyApiTrack,
    "album" | "artists" | "id" | "name" | "href" | "uri"
>

export interface SpotifyApiTrack {
    album: {
        album_type: string,
        artists: [
            {
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                name: string,
                type: string,
                uri: string
            }
        ],
        available_markets: [ string ],
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        images: Array<SpotifyImage>,
        name: string,
        release_date: string,
        release_date_precision: string,
        total_tracks: number,
        type: string,
        uri: string,
    },
    artists: [
        {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string
        }
    ],
    available_markets: [ string ],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string,
    },
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
}

export interface SpotifyApiTrackSearchResponse {
    href: string,
    items: Array<SpotifyApiTrack>,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
}
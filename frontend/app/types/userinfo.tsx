import { SpotifyImage } from "./image"

export type UserInfo = {
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
      filter_enabled: boolean,
      filter_locked: boolean
    },
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
    product: string,
    type: string,
    uri: string
}
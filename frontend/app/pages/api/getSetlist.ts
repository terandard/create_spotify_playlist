import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyApi } from '../../lib/SpotifyApi';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';
import { RubyScrapingResponse } from '../../types/ruby-api';
import { SpotifyApiTrack, Track } from '../../types/track';
import { PlaylistFromScraping } from '../../types/playlist';

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { url } = query;
  const response = await fetch('http://ruby-api:8080/api/scraping?url='+url)
  const result = await response.json()

  const data: RubyScrapingResponse = result.data;
  const access_token: string = req.session.user.accessToken;
  const spotifyApi = new SpotifyApi(access_token);
  let search_query: string;

  // 取得した曲を検索
  let tracks: Track[] = [];
  for (const t of data.tracks) {
    search_query = "q= " + t + " " + data.artist + "&type=track";
    const search_response = await spotifyApi.searchItem(search_query);
    if (search_response.status != 200 || !search_response.data[0]) continue
    let first_track: Track = pickupTrackFromApi(search_response.data[0])
    tracks.push(first_track)
  }

  const setlist_result: PlaylistFromScraping = {
    event_title: data.event_title,
    event_subtitle: data.event_subtitle,
    tracks: tracks
  }

  res.status(200).json(setlist_result)
}

function pickupTrackFromApi (ApiTrack: SpotifyApiTrack): Track {
  return {
    album: ApiTrack.album,
    artists: ApiTrack.artists,
    id: ApiTrack.id,
    name: ApiTrack.name,
    href: ApiTrack.href,
    uri: ApiTrack.uri
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
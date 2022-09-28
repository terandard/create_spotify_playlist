import { Track } from '../types/track';
import Images from "./images";
import styles from '../styles/Track.module.scss'

type Props = {
    track: Track,
    index: string
}

const ShowTrack = ({track, index}: Props) => {
    return (
        <div className={styles.track__wrapper}>
            <p className={styles.track__index}>{index}</p>
            <Images images={track.album.images} description={track.name} size="small" />
            <div className={styles.track__details}>
                <p className={styles.track__name}>{track.name}</p>
                <p className={styles.track__artist}>
                    {track.artists.map((a, i) => (
                        <span key={a.id}>
                            {track.artists.length - 1 != i ? a.name + ", " : a.name}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default ShowTrack;
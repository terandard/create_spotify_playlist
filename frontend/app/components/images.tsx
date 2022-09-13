import Image from "next/image";
import NoImage from "./noimage";
import { SpotifyImage } from "../types/image";

type Props = {
    images: Array<SpotifyImage>,
    description: string
}

export default function Images({images, description}: Props) {
    let has_image: boolean = images.length > 0;
    if (has_image) {
        let img: SpotifyImage = images[0]
        return (
            <Image 
                src={img.url} 
                height={img.height} 
                width={img.width} 
                alt={description} />
        )

    } else {
        return <NoImage />
    }
}
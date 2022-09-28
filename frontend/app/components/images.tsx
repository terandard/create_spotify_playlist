import Image from "next/image";
import NoImage from "./noimage";
import { SpotifyImage } from "../types/image";

type Props = {
    images: Array<SpotifyImage>,
    description: string,
    size: "small" | "large"
}

export default function Images({images, description, size}: Props) {
    let has_image: boolean = images.length > 0;
    if (has_image) {
        const index = size == "small" ? 2 : 1; 
        let img: SpotifyImage = images[index]
        return (
            <Image 
                src={img.url} 
                height={img.height} 
                width={img.width} 
                alt={description} />
        )

    } else {
        return <NoImage size={size} />
    }
}
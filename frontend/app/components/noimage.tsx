import Image from "next/image";

type Props = {
    size: "small" | "large"
}

const NoImage = ({size}: Props) => {
    const size_number = size == "small" ? 64 : 300;
    return (
        <Image src="/noimage.jpg" width={size_number} height={size_number} alt="no image" />
    )
}

export default NoImage
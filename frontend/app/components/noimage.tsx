import Image from "next/image";

const NoImage = () => {
    return (
        <Image src="/noimage.jpg" width={640} height={640} alt="no image" />
    )
}

export default NoImage
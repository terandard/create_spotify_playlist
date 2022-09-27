import React, {useState} from "react";
import Loading from "../components/loading";
import { useRouter } from 'next/router'

const Custom401 = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const refreshToken = async () => {
        setIsLoading(true);
        const response = await fetch('/api/auth/refreshToken');
        router.back();
        setIsLoading(false);
    }

    return (
        <div>
            <Loading isLoading={isLoading} />
            <p>セッションの有効期限が切れました。</p>
            <p>再認証してください。</p>
            <button onClick={() => refreshToken()}>再認証</button>
        </div>
    )
}

export default Custom401
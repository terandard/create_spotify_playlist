import styles from '../styles/PageTop.module.scss';
import { useState, useEffect } from 'react';

const PAGE_Y_OFFSET: number = 200

const PageTop = () => {
    const [show, setShow] = useState<boolean>(false)

    const changeShow = () => {
        setInterval(()=> {
            if (window.pageYOffset > PAGE_Y_OFFSET) {
                setShow(true)
            } else {
                setShow(false)
            }
            return 1
        }, 500)
    }
    
    const onScrollTop = () => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', changeShow)
        return () => window.removeEventListener('scroll', changeShow)
    }, [])
    
    if (show) return (
        <button className={styles.top} onClick={onScrollTop} />
    )

    else return null
}

export default PageTop;
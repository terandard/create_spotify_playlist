import styles from '../styles/Header.module.scss'
import Link from 'next/link'
import React, {useState} from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClick = () => {
        console.log(isOpen)
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.header}>
            <div className={`${styles.wrapper} ${styles.header__wrapper}`}>
                <Link href="/" className={styles.brand}>セトリプレイリストメーカー</Link>
                <nav className={styles.nav}>
                    <button className={`${styles.nav__toggle} ${isOpen ? styles.active : ''}`} 
                            onClick={() => onClick()}>
                        <span/>
                    </button>
                    <ul className={`${styles.nav__wrapper} ${isOpen ? styles.active : ''}`}>
                        <li className={styles.nav__item}><Link href="/user">ユーザーページ</Link></li>
                        <li className={styles.nav__item}><Link href="/user/playlists">プレイリスト一覧</Link></li>
                        <li className={styles.nav__item}><Link href="/get_setlist">プレイリスト作成</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
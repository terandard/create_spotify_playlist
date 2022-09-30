import styles from '../styles/Header.module.scss'
import Link from 'next/link'
import React, {useState, useRef, useEffect} from "react";
import { useRouter } from 'next/router';

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const menuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const menu = menuRef.current;
        if (!menu) return;

        const hundleClickOutside = (e: MouseEvent) => {
            // 範囲外をクリックした場合はメニューを閉じる
            if (!menu.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", hundleClickOutside);

        return () => {
            document.removeEventListener("click", hundleClickOutside);
        };
    }, [menuRef])

    const onClick = () => {
        setIsOpen(!isOpen)
    }

    const movePage = (url: string) => {
        router.push(url);
        setIsOpen(false);
    }

    return (
        <header className={styles.header}>
            <div className={`${styles.wrapper} ${styles.header__wrapper}`}>
                <Link href="/">
                    <a className={styles.brand}>セトリプレイリストメーカー</a>
                </Link>
                <nav className={styles.nav} ref={menuRef} >
                    <button className={`${styles.nav__toggle} ${isOpen ? styles.active : ''}`} 
                            onClick={() => onClick()}>
                        <span/>
                    </button>
                    <ul className={`${styles.nav__wrapper} ${isOpen ? styles.active : ''}`} >
                        <li className={styles.nav__item} 
                            onClick={() => movePage("/user")}>
                            ユーザーページ
                        </li>
                        <li className={styles.nav__item} 
                            onClick={() => movePage("/user/playlists")}>
                            プレイリスト一覧
                        </li>
                        <li className={styles.nav__item} 
                            onClick={() => movePage("/get_setlist")}>
                            プレイリスト作成
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
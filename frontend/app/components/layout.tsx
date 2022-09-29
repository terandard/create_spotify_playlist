import { ReactElement } from "react"
import Header from "./header"
import PageTop from "./page_top"

type LayoutProps = Required<{
    readonly children: ReactElement
}>

const Layout = ({children}: LayoutProps) => {
    return (
        <main>
            <Header />
            {children}
            <PageTop />
        </main>
    )
}

export default Layout
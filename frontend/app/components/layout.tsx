import { ReactElement } from "react"
import Header from "./header"
import PageTop from "./page_top"
import Loading from "./loading"

type LayoutProps = Required<{
    readonly children: ReactElement,
    isLoading: boolean
}>

const Layout = ({children, isLoading}: LayoutProps) => {
    return (
        <main>
            <Loading isLoading={isLoading} />
            <Header />
            {children}
            <PageTop />
        </main>
    )
}

export default Layout
import { ReactElement } from "react"
import Header from "./header"

type LayoutProps = Required<{
    readonly children: ReactElement
}>

const Layout = ({children}: LayoutProps) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}

export default Layout
import { FunctionComponent } from "react"

import { Header } from "@/lib/components/types"

type HeaderProps = {
    data: Header
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ data }) => {
    return (
        <header className="mt-16 py-24 text-center">
            <h1 className="mb-2 text-7xl text-headings text-primary">{data.title}</h1>
            <h2 className="mb-5 text-3xl text-baseText">{data.subtitle}</h2>
            <p className="text-sm text-baseText">{data.description}</p>
        </header>
    )
}

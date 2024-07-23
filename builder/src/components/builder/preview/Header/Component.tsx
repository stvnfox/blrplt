import { FunctionComponent } from "react"

import { Header } from "@/lib/components/types"

type HeaderProps = {
    data: Header
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ data }) => {
    return (
        <header className="mt-16 text-center">
            <h1 className="mb-2 text-7xl">{data.title}</h1>
            <h2 className="mb-5 text-3xl">{data.subtitle}</h2>
            <p className="text-sm">{data.description}</p>
        </header>
    )
}

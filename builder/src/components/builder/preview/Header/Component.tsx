import { FunctionComponent } from "react"

import { Header } from "@/lib/components/types"

type HeaderProps = {
    data: Header
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ data }) => {
    return (
        <header className="mt-2 md:mt-8 py-12 md:py-32 text-center bg-primary shadow-xl rounded-[32px]">
            <h1 className="mb-1 md:mb-4 text-3xl md:text-6xl text-background text-balance">{data.title}</h1>
            <h2 className="mb-5 md:mb-8 md:text-2xl text-background">{data.subtitle}</h2>
            <p className="text-sm text-background text-balance">{data.description}</p>
        </header>
    )
}

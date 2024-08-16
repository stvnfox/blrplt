import { FunctionComponent } from "react"

import { Header } from "@/lib/components/types"

type HeaderProps = {
    data: Header
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ data }) => {
    return (
        <header className="mt-2 rounded-2xl sm:rounded-[32px] bg-neutral-200 py-6 md:py-12 sm:mt-8 sm:pb-12 sm:pt-40 md:pt-48">
            <div className="px-6 md:px-12 lg:w-1/2">
                <h2 className="mb-5 w-fit rounded-full bg-primary px-3 py-1.5 text-background md:mb-2 md:text-sm">
                    {data.subtitle}
                </h2>
                <h1 className="mb-1 text-balance text-3xl text-primary md:mb-4 md:text-6xl">{data.title}</h1>
                <p className="text text-balance text-baseText">{data.description}</p>
            </div>
        </header>
    )
}

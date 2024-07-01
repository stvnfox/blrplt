"use client"

import { FunctionComponent } from "react"
import { usePreviewContext } from "@/providers/PreviewContextProvider"

type DynamicPreviewPageProps = {
    slug: string
}

export const DynamicPreviewPage: FunctionComponent<DynamicPreviewPageProps> = (props) => {
    const { slug } = props
    const { sites } = usePreviewContext()

    const page = sites[0].pages.filter((page: any) => page.name.toLowerCase() === "home" )

    return (
        <main className="m-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl mb-2">{slug}</h2>
            </div>
            <header className="mt-16 text-center">
                <h1 className="text-7xl mb-2">{page[0].components[0].data.title}</h1>
                <h2 className="text-3xl mb-5">{page[0].components[0].data.subtitle}</h2>
                <p className="text-sm">{page[0].components[0].data.description}</p>
            </header>
        </main>
    )
}
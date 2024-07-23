"use client"

import { FunctionComponent } from "react"
import { usePreviewContext } from "@/providers/PreviewContextProvider"
import { ComponentMapper } from "../preview/ComponentMapper/ComponentMapper"

type DynamicPreviewPageProps = {
    slug: string
}

export const DynamicPreviewPage: FunctionComponent<DynamicPreviewPageProps> = (props) => {
    const { slug } = props
    const { sites, siteName } = usePreviewContext()

    const currentPage = slug.length > 1 ? slug[1] : "home"
    const page = sites[0].pages.filter((page: any) => page.name.toLowerCase() === currentPage.toLowerCase())[0]

    return (
        <main className="m-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl mb-2">{siteName}</h2>
            </div>
            <ComponentMapper components={page?.components} slug={page?.name}/>
        </main>
    )
}
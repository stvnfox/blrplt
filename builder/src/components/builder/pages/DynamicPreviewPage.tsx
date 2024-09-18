"use client"

import { FunctionComponent } from "react"

import { usePreviewContext } from "@/providers/PreviewContextProvider"

import { ComponentMapper } from "../preview/ComponentMapper/ComponentMapper"

type DynamicPreviewPageProps = {
    slug: string
}

export const DynamicPreviewPage: FunctionComponent<DynamicPreviewPageProps> = ({ slug }) => {
    const { sites, siteName } = usePreviewContext()

    const currentPage = slug.length > 1 ? slug[1] : "home"
    const page = sites[0].pages.filter((page: any) => page.name.toLowerCase() === currentPage.toLowerCase())[0]

    return (
        <main className="bg-background py-4 md:py-8">
            <div className="container flex items-center justify-between">
                <a href="/" className="mb-2 text-xl md:text-2xl text-baseText hover:text-primary transition-colors">{siteName}</a>
            </div>
            <ComponentMapper
                // @ts-expect-error because page isn't typed because jsobb scheme is not available
                components={page?.components}
            />
        </main>
    )
}

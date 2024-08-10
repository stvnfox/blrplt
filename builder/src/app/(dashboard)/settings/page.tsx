"use client"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { HeadingComponent } from "@/components/builder/layout/HeadingComponent"
import { OpenGraph } from "@/components/builder/blocks/Dashboard/OpenGraph/OpenGraph"
import { SiteComponent } from "@/components/builder/blocks/Dashboard/SiteComponent/SiteComponent"
import { StylingComponent } from "@/components/builder/blocks/Dashboard/StylingComponent/StylingComponent"

export default function Settings() {
    const { sites } = useBuilderContext()

    return (
        <section className="flex flex-1 flex-col gap-4">
            <HeadingComponent
                title="site settings"
                firstHeading
            />
            <SiteComponent site={sites[0]} />
            <HeadingComponent
                title="styling settings"
            />
            <StylingComponent />
            <HeadingComponent
                title="open graph settings"
            />
            <OpenGraph />
        </section>
    )
}

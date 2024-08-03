"use client"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { SiteComponent } from "@/components/builder/blocks/Dashboard/SiteComponent/SiteComponent"
import { StylingComponent } from "@/components/builder/blocks/Dashboard/StylingComponent/StylingComponent"

export default function Settings() {
    const { sites, siteName } = useBuilderContext()

    return (
        <section className="flex flex-1 flex-col gap-4">
            <div className="flex w-full items-center justify-between px-4 pt-4 md:px-8 md:pt-8">
                <h1>{siteName ? siteName : "blrplt builder"} - site settings</h1>
            </div>
            <SiteComponent site={sites[0]} />
            <div className="flex w-full items-center justify-between px-4 pt-4 md:px-8 md:pt-8 md:-mt-0.5">
                <h2>{siteName ? siteName : "blrplt builder"} - styling settings</h2>
            </div>
            <StylingComponent />
        </section>
    )
}

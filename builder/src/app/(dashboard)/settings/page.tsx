"use client"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { HeadingComponent } from "@/components/builder/layout/HeadingComponent"
import { OpenGraph } from "@/components/builder/dashboard/Settings/OpenGraph/OpenGraph"
import { SiteComponent } from "@/components/builder/dashboard/Settings/SiteComponent/SiteComponent"
import { StylingComponent } from "@/components/builder/dashboard/Settings/StylingComponent/StylingComponent"
import { CreateSiteComponent } from "@/components/builder/dashboard/Dashboard/CreateSite/CreateSiteComponent"

export default function Settings() {
    const { sites } = useBuilderContext()
    const site = sites[0]

    return (
        <section className="flex flex-1 flex-col gap-4">
            {site ? (
                <>
                    <HeadingComponent
                        title="site settings"
                        firstHeading
                    />
                    <SiteComponent site={site} />
                    <HeadingComponent title="styling settings" />
                    <StylingComponent />
                    <HeadingComponent title="seo settings" />
                    <OpenGraph />
                </>
            ) : (
                <div className="px-4 pt-8 md:px-8">
                    <h1 className="mb-4">blrplt builder - site settings</h1>
                    <p className="mb-4 text-sm italic">no site found yet, create one below</p>
                    <CreateSiteComponent />
                </div>
            )}
        </section>
    )
}

"use client"

import { CreateSiteComponent } from "@/components/builder/blocks/Dashboard/CreateSite/CreateSiteComponent"
import { SiteComponent } from "@/components/builder/blocks/Dashboard/SiteComponent/SiteComponent"
import { PagesComponent } from "@/components/builder/layout/PagesComponent"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

export default function Dashboard() {
    const { sites, siteName } = useBuilderContext()

    return (
        <section className="flex flex-1 flex-col gap-4">
            <div className="flex w-full items-center justify-between pt-4 px-4 md:pt-8 md:px-8">
                <h1>{ siteName } - { siteName !== "blrplt builder" ? "site settings" : "dashboard" }</h1>
            </div>
            {sites[0] ? (
                <>
                    {sites.map((site, index) => (
                        <SiteComponent
                            key={`site-${index}`}
                            site={site}
                        />
                    ))}
                    <PagesComponent />
                </>
            ) : (
                <div className="px-4 md:px-8">
                    <p className="text-sm italic mb-4">no site found yet, create one below</p>
                    <CreateSiteComponent />
                </div>
            )}
        </section>
    )
}

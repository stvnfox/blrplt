"use client"

import { CreateSiteComponent } from "@/components/builder/blocks/Dashboard/CreateSite/CreateSiteComponent"
import { SiteComponent } from "@/components/builder/blocks/Dashboard/SiteComponent/SiteComponent"
import { PagesComponent } from "@/components/builder/layout/PagesComponent"
import { Button } from "@/components/ui/button"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

export default function Dashboard() {
    const { sites } = useBuilderContext()

    return (
        <section className="flex flex-1 flex-col gap-4">
            <div className="flex w-full items-center justify-between pt-4 px-4 md:pt-8 md:px-8">
                <h1>{sites[0] ? sites[0].name : "blrplt builder"} - site settings</h1>
                {sites[0] && (
                    <Button
                        asChild
                        variant="outline"
                        className="shadow-none"
                    >
                        <a
                            target="_blank"
                            href={`/preview/${sites[0].url}`}
                        >
                            preview
                        </a>
                    </Button>
                )}
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

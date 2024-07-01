"use client"

import { CreateSiteComponent } from "@/components/builder/blocks/Dashboard/CreateSite/CreateSiteComponent"
import { SiteComponent } from "@/components/builder/blocks/Dashboard/SiteComponent/SiteComponent"
import { Button } from "@/components/ui/button"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

export default function Dashboard() {
    const { sites } = useBuilderContext()

    return (
        <section className="w-full">
            <div className="flex w-full items-center justify-between my-4">
                <h1>{sites[0].name} - dashboard</h1>
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
            </div>
            {sites.length === 0 ? (
                <CreateSiteComponent />
            ) : (
                <>
                    {sites.map((site, index) => (
                        <SiteComponent
                            key={`site-${index}`}
                            site={site}
                        />
                    ))}
                </>
            )}
        </section>
    )
}

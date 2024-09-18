"use client"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { DashboardComponent } from "@/components/builder/dashboard/Dashboard/Component"
import { CreateSiteComponent } from "@/components/builder/dashboard/Dashboard/CreateSite/CreateSiteComponent"

export default function Dashboard() {
    const { sites, siteName } = useBuilderContext()

    return (
        <section className="flex flex-1 flex-col gap-4">
            {sites[0] ? (
                <>
                    <DashboardComponent/>
                </>
            ) : (
                <div className="px-4 md:px-8">
                    <div className="flex w-full items-center justify-between pt-4 md:pt-8">
                        <h1>{ siteName } - dashboard</h1>
                    </div>
                    <p className="text-sm italic mb-4">no site found yet, create one below</p>
                    <CreateSiteComponent />
                </div>
            )}
        </section>
    )
}
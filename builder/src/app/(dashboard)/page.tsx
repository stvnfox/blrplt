"use client"
import dynamic from "next/dynamic"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { CreateSiteComponent } from "@/components/builder/dashboard/Dashboard/CreateSite/Component"
const DashboardComponent = dynamic(() => import("@/components/builder/dashboard/Dashboard/Component"), {
    ssr: false,
})

export default function Dashboard() {
    const { sites, siteName } = useBuilderContext()

    return (
        <section className="flex flex-1 flex-col gap-4">
            {sites[0] ? (
                <>
                    <DashboardComponent />
                </>
            ) : (
                <div className="px-4 md:px-8">
                    <div className="flex w-full items-center justify-between pt-4 md:pt-8">
                        <h1>{siteName} - dashboard</h1>
                    </div>
                    <p className="mb-4 text-sm italic">no site found yet, create one below</p>
                    <CreateSiteComponent />
                </div>
            )}
        </section>
    )
}

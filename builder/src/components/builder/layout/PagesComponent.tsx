"use client"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { CreatePageComponent } from "../blocks/Dashboard/CreatePage/CreatePageComponent"
import { DynamicBuilderPage } from "../pages/DynamicBuilderPage"
import { AddComponentButton } from "../blocks/Dashboard/AddComponentButton/AddComponentButton"

export const PagesComponent = () => {
    const { sites } = useBuilderContext()
    const page = sites[0].pages[0]
    console.log(page)

    // Not using the multi page option for MVP, uncomment when using again
    // TODO: Fix the typing of sites.pages
    // const defaultTab = sites[0].pages[0]?.name

    return (
        <section className="mt-6">
            <div className="flex items-center justify-between mb-4">
                {/* Not using the multi page option for MVP, uncomment when using again:  */}
                {/* <h2>{sites[0].name} - pages</h2> */}
                {/* <CreatePageComponent /> */}
                <h2>{sites[0].name} - components</h2>
                <AddComponentButton />
            </div>
                {/* Not using the multi page option for MVP, uncomment when using again:  */}
                {/* <div className="border rounded-md border-neutral-100 mt-6">
                    <Tabs
                        defaultValue={defaultTab}
                        className="p-4 w-full"
                    >
                        <TabsList>
                            {sites[0].pages.map((page: any, index: number) => (
                                <TabsTrigger
                                    key={`page-${index}`}
                                    value={page.name}
                                >
                                    {page.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {sites[0].pages.map((page: any, index: number) => (
                            <TabsContent
                                key={`page-${index}`}
                                value={page.name}
                            >
                                <DynamicBuilderPage data={page}/>
                            </TabsContent>
                        ))}
                    </Tabs> 
                </div> */}
                <DynamicBuilderPage data={page}/>
        </section>
    )
}

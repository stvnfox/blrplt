"use client"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePageComponent } from "../blocks/Dashboard/CreatePage/CreatePageComponent"
import { DynamicBuilderPage } from "../pages/DynamicBuilderPage"

export const PagesComponent = () => {
    const { sites } = useBuilderContext()
    // TODO: Fix the typing of sites.pages
    const defaultTab = sites[0].pages[0]?.name

    return (
        <section>
            <div className="flex items-center justify-between">
                <h2>{sites[0].name} - pages</h2>
                <CreatePageComponent />
            </div>
            <div className="border rounded-md border-neutral-100 mt-6">
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
            </div>
        </section>
    )
}

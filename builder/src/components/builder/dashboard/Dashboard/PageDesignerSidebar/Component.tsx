"use client"

import { FunctionComponent } from "react"

import { useDesigner } from "@/lib/hooks/useDesigner"

import { PropertiesSidebar } from "./components/PropertiesSidebar"
import { DesignerSidebar } from "./components/DesignerSidebar"

export const PageDesignerSidebar: FunctionComponent = () => {
    const { selectedComponent } = useDesigner()

    return <aside className="h-full w-full">{selectedComponent ? <PropertiesSidebar /> : <DesignerSidebar />}</aside>
}

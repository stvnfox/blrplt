"use client"

import { FunctionComponent } from "react"

import { useDesigner } from "@/lib/hooks/useDesigner"

import { ComponentToolbar } from "./components/ComponentToolbar"
import { PropertiesToolbar } from "./components/PropertiesToolbar"

export const MobileToolbar: FunctionComponent = () => {
    const { selectedComponent } = useDesigner()

    return <aside className="h-full w-full">{selectedComponent ? <PropertiesToolbar /> : <ComponentToolbar />}</aside>
}

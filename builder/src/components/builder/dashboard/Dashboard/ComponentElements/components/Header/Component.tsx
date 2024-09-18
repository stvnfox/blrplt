"use client"

import { Captions } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../Component"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent"

const type: ComponentsType = "header"

const extraAttributes = {
    label: "header",
    helperText: "this is a header component",
    title: "title",
    subtitle: "subtitle",
    description: "description",
}

export type CustomHeaderInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const HeaderComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes 
    }),
    designerButtonElement: {
        icon: <Captions size={24}/>,
        label: "header"
    },
    designerComponent: DesignerComponent,
    pageDesignerComponent: () => {
        return (
            <div>
                page designer component
            </div>
        )
    },
    propertiesComponent: PropertiesComponent
}
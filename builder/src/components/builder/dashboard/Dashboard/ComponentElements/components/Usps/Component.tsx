"use client"

import { Tags } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../Component"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent/Component"

const type: ComponentsType = "usps"

const extraAttributes = {
    label: "usps",
    helperText: "highlight what sets you apart from the competition.",
    title: "title",
    description: "description",
    items: [
        {
            title: "blrplt builder - unique selling points",
            description: "blrplt builder - unique selling points",
        },
        {
            title: "blrplt builder - unique selling points",
            description: "blrplt builder - unique selling points",
        },
    ]
}

export type CustomUspsInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const UspsComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes 
    }),
    designerButtonElement: {
        icon: <Tags size={22}/>,
        label: "unique selling points"
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
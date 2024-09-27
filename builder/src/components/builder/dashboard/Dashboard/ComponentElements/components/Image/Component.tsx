"use client"

import { Camera } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../Component"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent"

const type: ComponentsType = "image"

const extraAttributes = {
    label: "image",
    helperText: "add an image with an optional caption for context",
    src: {
        url: "",
        extension: "",
        path: "",
    },
    alt: "",
    description: "description",
}

export type CustomImageInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const ImageComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerButtonElement: {
        icon: <Camera size={24} />,
        label: "image",
    },
    designerComponent: DesignerComponent,
    pageDesignerComponent: () => {
        return <div>page designer component</div>
    },
    propertiesComponent: PropertiesComponent,
}

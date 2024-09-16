"use client"

import { LayoutList } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../ComponentElements/Component"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent"

const type: ComponentsType = "feature"

const extraAttributes = {
    label: "feature",
    helperText: "showcase a feature with an image, title, description and optional action button",
    title: "title",
    description: "description",
    cta: undefined as undefined | {
        label: string;
        href: string;
        ariaLabel: string;
    },
    image: {
        src: {
            url: "",
            extension: "",
            path: "",
        },
        alt: "alt",
        position: "left"
    }
}

export type CustomFeatureInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const FeatureComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes 
    }),
    designerButtonElement: {
        icon: <LayoutList size={20}/>,
        label: "feature"
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
"use client"

import { MessageSquareText } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../Component"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent"

const type: ComponentsType = "form"

const extraAttributes = {
    label: "form",
    helperText: "allow visitors to easily reach out with a predefined or customizable form",
    title: "title",
    description: "description",
    // add form fields
}

export type CustomFormInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const FormComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerButtonElement: {
        icon: <MessageSquareText size={20} />,
        label: "form",
    },
    designerComponent: DesignerComponent,
    pageDesignerComponent: () => {
        return <div>page designer component</div>
    },
    propertiesComponent: PropertiesComponent,
}

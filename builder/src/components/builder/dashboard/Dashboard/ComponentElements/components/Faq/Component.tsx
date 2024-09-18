"use client"

import { MessageCircleQuestionIcon } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../Component"
import { createUuid } from "@/lib/utils"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent/Component"

const type: ComponentsType = "faq"

const extraAttributes = {
    label: "frequently asked questions",
    helperText: "answer common customer questions efficiently",
    title: "title",
    description: "description",
    items: [
        {
            question: "blrplt builder - frequently asked questions",
            answer: "blrplt builder - frequently asked questions",
            id: createUuid(),
        },
        {
            question: "blrplt builder - frequently asked questions",
            answer: "blrplt builder - frequently asked questions",
            id: createUuid(),
        },
        {
            question: "blrplt builder - frequently asked questions",
            answer: "blrplt builder - frequently asked questions",
            id: createUuid(),
        }
    ]
}

export type CustomFaqInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const FaqComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes 
    }),
    designerButtonElement: {
        icon: <MessageCircleQuestionIcon size={22}/>,
        label: "frequently asked questions"
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
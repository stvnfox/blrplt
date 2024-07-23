import { ComponentDefaultValues, ComponentKey } from "./types"
import { createUuid } from "../utils"

export const componentDefaultValues: ComponentDefaultValues = {
    header: {
        title: "welcome to blrplt builder",
        subtitle: "the best landing page builder",
        description: "pick your components and start building your landing page in a breeze",
    },
    usps: {
        title: "blrplt builder - unique selling points",
        items: [
            {
                title: "blrplt builder - unique selling points",
                description: "blrplt builder - unique selling points",
            },
        ],
    },
    pricing: {
        title: "blrplt builder - pricing",
        description: "blrplt builder - pricing",
        items: [
            {
                title: "blrplt builder - pricing",
                description: "blrplt builder - pricing",
                price: 49.99,
                currency: "EUR",
                mostPopular: false,
                includes: [
                    "blrplt builder - pricing",
                ]
            }
        ]
    },
    faq: {
        title: "blrplt builder - frequently asked questions",
        description: "blrplt builder - frequently asked questions",
        items: [
            {
                question: "blrplt builder - frequently asked questions",
                answer: "blrplt builder - frequently asked questions",
                id: createUuid(),
            }
        ]
    },
    content: {
        title: "blrplt builder - content block",
        description: "blrplt builder - content block",
        cta: {
            label: "get started",
            href: "/random",
            ariaLabel: "click here to get started",
        },
        image: {
            src: "https://source.unsplash.com/random/800x600",
            alt: "random image",
            position: "left",
        }
    }
}

export const addDefaultComponentValues = (component: ComponentKey) => {
    return componentDefaultValues[component]
}

export const createDefaultFormValues = (
    components: ComponentKey[],
    existingData?: Partial<ComponentDefaultValues>
): Partial<ComponentDefaultValues> => {
    const formValues: Partial<ComponentDefaultValues> = {}

    components.forEach((component) => {
        formValues[component] = {
            ...componentDefaultValues[component],
            ...(existingData?.[component] ?? {}),
        }
    })

    return formValues
}

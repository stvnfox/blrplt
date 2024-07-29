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
            {
                title: "blrplt builder - unique selling points",
                description: "blrplt builder - unique selling points",
            },
            {
                title: "blrplt builder - unique selling points",
                description: "blrplt builder - unique selling points",
            }
        ],
    },
    pricing: {
        title: "blrplt builder - pricing",
        description: "blrplt builder - pricing",
        items: [
            {
                title: "blrplt builder - free",
                description: "blrplt builder - free",
                price: 0.00,
                currency: "EUR",
                mostPopular: false,
                includes: [
                    "blrplt builder - free",
                ]
            },
            {
                title: "blrplt builder - basic",
                description: "blrplt builder - basic",
                price: 49.99,
                currency: "EUR",
                mostPopular: true,
                includes: [
                    "blrplt builder - basic",
                ]
            },
            {
                title: "blrplt builder - pro",
                description: "blrplt builder - pro",
                price: 49.99,
                currency: "EUR",
                mostPopular: false,
                includes: [
                    "blrplt builder - pro",
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
    },
    content: {
        title: "blrplt builder - content block",
        description: "blrplt builder - content block",
        cta: {
            label: "get started",
            href: "/",
            ariaLabel: "click here to get started",
        },
        image: {
            src: "https://images.unsplash.com/photo-1462688681110-15bc88b1497c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        // @ts-expect-error because of different otions in components
        formValues[component] = {
            ...componentDefaultValues[component],
            ...(existingData?.[component] ?? {}),
        }
    })

    return formValues
}

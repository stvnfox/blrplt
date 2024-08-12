import { ComponentDefaultValues, ComponentKey } from "./types"
import { createUuid } from "../utils"

export const componentDefaultValues: ComponentDefaultValues = {
    header: {
        title: "welcome to blrplt builder",
        subtitle: "the best landing page builder",
        description: "pick your components and start building your landing page in a breeze",
        backgroundColor: "primary",
        textColor: "primary",
        headingColor: "primary",
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
            buttonStyle: "default",
            buttonLook: "primary"
        },
        image: {
            src: {
                url: "",
                extension: "",
                path: "",
            },
            alt: "random image",
            position: "left",
        },
        backgroundColor: "primary",
        textColor: "primary",
        headingColor: "primary",
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

export const getBackgroundColor = (color: string) => {
    switch(color) {
        case "primary":
            return "bg-background-primary"
        case "secondary":
            return "bg-background-secondary"
        case "tertiary":
            return "bg-background-tertiary"
        default:
            return "bg-background-primary"
    }
}

export const getHeadingColor = (color: string) => {
    switch(color) {
        case "primary":
            return "text-headings-primary"
        case "secondary":
            return "text-headings-secondary"
        default:
            return "text-headings-primary"
    }
}

export const getTextColor = (color: string) => {
    switch(color) {
        case "primary":
            return "text-text-primary"
        case "secondary":
            return "text-text-secondary"
        case "tertiary":
            return "text-text-tertiary"
        default:
            return "text-text-primary"
    }
}

export const getButtonLook = (look: string) => {
    switch(look) {
        case "primary":
            return "bg-button-background-primary text-button-text-primary hover:opacity-90 transition-opacity"
        case "secondary":
            return "bg-button-background-secondary text-button-text-secondary hover:opacity-90 transition-opacity"
        default:
            return "bg-button-background-primary text-button-text-primary hover:opacity-90 transition-opacity"
    }
}
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
        description: "highlight what sets you apart from the competition.",
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
            },
        ],
    },
    pricing: {
        title: "blrplt builder - pricing",
        description: "blrplt builder - pricing",
        items: [
            {
                title: "blrplt builder - free",
                description: "blrplt builder - free",
                price: 0.0,
                currency: "EUR",
                mostPopular: false,
                includes: ["blrplt builder - free"],
            },
            {
                title: "blrplt builder - basic",
                description: "blrplt builder - basic",
                price: 49.99,
                currency: "EUR",
                mostPopular: true,
                includes: ["blrplt builder - basic"],
            },
            {
                title: "blrplt builder - pro",
                description: "blrplt builder - pro",
                price: 49.99,
                currency: "EUR",
                mostPopular: false,
                includes: ["blrplt builder - pro"],
            },
        ],
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
            },
        ],
    },
    feature: {
        title: "blrplt builder - feature block",
        description: "blrplt builder - feature block",
        cta: {
            label: "get started",
            href: "/",
            ariaLabel: "click here to get started",
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
    },
    image: {
        src: {
            url: "",
            extension: "",
            path: "",
        },
        alt: "",
        description: "this is an optional description to show below the image",
    },
    form: {
        title: "blrplt builder - contact us",
        description: "blrplt builder - contact us",
        form: null,
        // add more fields here
    },
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

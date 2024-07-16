import { ComponentDefaultValues, ComponentKey } from "./types"

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

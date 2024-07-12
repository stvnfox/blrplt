import { ComponentDefaultValues, ComponentKey } from "./types";

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
                cta: {
                    label: "blrplt builder - unique selling points",
                    link: "/",
                    ariaLabel: "blrplt builder - unique selling points",
                }
            }
        ]
    }
}

export const addDefaultComponentValues = (component: ComponentKey) => {
    return componentDefaultValues[component];
}

export const createDefaultFormValues = (components: ComponentKey[]): Partial<ComponentDefaultValues> => {
    const formValues: Partial<ComponentDefaultValues> = {};

    components.forEach(component => {
        formValues[component] = componentDefaultValues[component];
    });

    return formValues;
};
export const componentDefaultValues = {
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

export const addDefaultComponentValues = (component: string) => {
    console.log(component)
    if(component === "usps") {
        return componentDefaultValues.usps
    }
}
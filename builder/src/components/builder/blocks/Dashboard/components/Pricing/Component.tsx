"use client"

import { Wallet } from "lucide-react"
import { ComponentsType, ComponentElementType, ComponentElementInstance } from "../../ComponentElements/Component"

import { DesignerComponent } from "./DesignerComponent"
import { PropertiesComponent } from "./PropertiesComponent/Component"

const type: ComponentsType = "pricing"

interface PricingItem {
    title: string;
    description: string;
    price: number | undefined;
    currency: string;
    mostPopular: boolean;
    includes: string[];
}

const extraAttributes = {
    label: "pricing",
    helperText: "this is the pricing component",
    title: "title",
    description: "description",
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
}

export type CustomPricingInstance = ComponentElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const PricingComponent: ComponentElementType = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes 
    }),
    designerButtonElement: {
        icon: <Wallet size={22}/>,
        label: "pricing"
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
import { ReactElement } from "react"

import { HeaderComponent } from "./components/Header/Component"
import { PricingComponent } from "./components/Pricing/Component"
import { UspsComponent } from "./components/Usps/Component"
import { FaqComponent } from "./components/Faq/Component"
import { FeatureComponent } from "./components/Feature/Component"
import { ImageComponent } from "./components/Image/Component"

//TODO: Add more components here
export type ComponentsType = "header" | "pricing" | "usps" | "faq" | "feature" | "image"

export type ComponentElementType = {
    type: ComponentsType

    construct: (id: string) => ComponentElementInstance

    designerButtonElement: {
        icon: ReactElement
        label: string
    }

    designerComponent: React.FC<{
        instance: ComponentElementInstance
    }>
    pageDesignerComponent: React.FC
    propertiesComponent: React.FC<{
        instance: ComponentElementInstance
    }>
}

export type ComponentElementInstance = {
    id: string
    type: ComponentsType
    extraAttributes?: Record<string, any>
}

type ComponentElementsType = {
    [key in ComponentsType]: ComponentElementType
}
export const PageDesignerComponents: ComponentElementsType = {
    header: HeaderComponent,
    pricing: PricingComponent,
    usps: UspsComponent,
    faq: FaqComponent,
    feature: FeatureComponent,
    image: ImageComponent,
}

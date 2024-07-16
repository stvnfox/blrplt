import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { Header } from "@/components/builder/blocks/Header/Header"
import { Usps } from "@/components/builder/blocks/Usps/Usps"
import { Pricing } from "@/components/builder/blocks/Pricing/Pricing"

type ComponentSwitcherProps = {
    component: BuilderComponent
    slug: string
    form: any
}

export const ComponentSwitcher: FunctionComponent<ComponentSwitcherProps> = ({ component, form }) => {
    if (component.type === "header") {
        return <Header form={form} />
    }

    if (component.type === "usps") {
        return <Usps form={form} />
    }

    if (component.type === "pricing") {
        return <Pricing form={form} />
    }
}
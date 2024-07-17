import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { Header } from "@/components/builder/blocks/Header/Header"
import { Faq } from "@/components/builder/blocks/Faq/Faq"
import { Pricing } from "@/components/builder/blocks/Pricing/Pricing"
import { Usps } from "@/components/builder/blocks/Usps/Usps"

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

    if (component.type === "faq") {
        return <Faq form={form} />
    }
}
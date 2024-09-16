import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { Content } from "@/components/builder/blocks/Content/Content"
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
    return (
        <div className="px-4 md:px-8">
            {component.type === "header" && <Header form={form} />}
            {component.type === "usps" && <Usps form={form} />}
            {component.type === "pricing" && <Pricing form={form} />}
            {component.type === "faq" && <Faq form={form} />}
            {component.type === "feature" && <Content form={form}/>}
        </div>
    )
}

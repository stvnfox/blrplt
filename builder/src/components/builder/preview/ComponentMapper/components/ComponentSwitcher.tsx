import { FunctionComponent } from "react"

import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

import { UspsComponent } from "@/components/builder/preview/Usps/Component"
import { HeaderComponent } from "@/components/builder/preview/Header/Component"
import { PricingComponent } from "@/components/builder/preview/Pricing/Component"
import { FaqComponent } from "@/components/builder/preview/Faq/Component"
import { ContentComponent } from "@/components/builder/preview/Content/Component"

type ComponentSwitcherProps = {
    component: ComponentElementInstance
}

export const ComponentSwitcher: FunctionComponent<ComponentSwitcherProps> = ({ component }) => {
    return (
        <div>
            {component.type === "header" && <HeaderComponent instance={component} />}
            {component.type === "usps" && <UspsComponent instance={component} />}
            {component.type === "pricing" && <PricingComponent instance={component} />}
            {component.type === "faq" && <FaqComponent instance={component} />}
            {component.type === "feature" && <ContentComponent instance={component} />}
        </div>
    )
}

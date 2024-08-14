import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { UspsComponent } from "@/components/builder/preview/Usps/Component"
import { HeaderComponent } from "@/components/builder/preview/Header/Component"
import { PricingComponent } from "@/components/builder/preview/Pricing/Component"
import { FaqComponent } from "@/components/builder/preview/Faq/Component"
import { ContentComponent } from "@/components/builder/preview/Content/Component"

type ComponentSwitcherProps = {
    component: BuilderComponent
    slug: string
}

export const ComponentSwitcher: FunctionComponent<ComponentSwitcherProps> = ({ component }) => {
    return (
        <div>
            {component.type === "header" && <HeaderComponent data={component.data} />}
            {component.type === "usps" && <UspsComponent data={component.data} />}
            {component.type === "pricing" && <PricingComponent data={component.data} />}
            {component.type === "faq" && <FaqComponent data={component.data} />}
            {component.type === "content" && <ContentComponent data={component.data} />}
        </div>
    )
}

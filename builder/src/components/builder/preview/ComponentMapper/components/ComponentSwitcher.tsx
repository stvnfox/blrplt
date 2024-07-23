import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { UspsComponent } from "@/components/builder/preview/Usps/Component"
import { HeaderComponent } from "@/components/builder/preview/Header/Component"
import { PricingComponent } from "@/components/builder/preview/Pricing/Component"


type ComponentSwitcherProps = {
    component: BuilderComponent
    slug: string
}

export const ComponentSwitcher: FunctionComponent<ComponentSwitcherProps> = ({ component }) => {
    return (
        <div className="px-4 md:px-8">
            {component.type === "header" && <HeaderComponent data={component.data} />}
            {component.type === "usps" && <UspsComponent data={component.data} />}
            {component.type === "pricing" && <PricingComponent data={component.data} />}
             {/* 
            {component.type === "faq" && <Faq />}
            {component.type === "content" && <Content />} */}
        </div>
    )
}

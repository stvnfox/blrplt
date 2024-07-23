import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { UspsComponent } from "@/components/builder/preview/Usps/Usps"
import { HeaderComponent } from "@/components/builder/preview/Header/Header"

type ComponentSwitcherProps = {
    component: BuilderComponent
    slug: string
}

export const ComponentSwitcher: FunctionComponent<ComponentSwitcherProps> = ({ component }) => {
    return (
        <div className="px-4 md:px-8">
            {component.type === "header" && <HeaderComponent data={component.data} />}
            {component.type === "usps" && <UspsComponent data={component.data} />}
            {/* {component.type === "pricing" && <Pricing />}
            {component.type === "faq" && <Faq />}
            {component.type === "content" && <Content />} */}
        </div>
    )
}

import { FunctionComponent } from "react"

import { BuilderComponent } from "@/components/builder/blocks/Dashboard/ComponentMapper/ComponentMapper"
import { Header } from "@/components/builder/blocks/Header/Header"

type ComponentSwitcherProps = {
    component: BuilderComponent
    slug: string
    form: any
}

export const ComponentSwitcher: FunctionComponent<ComponentSwitcherProps> = ({ component, form }) => {
    if (component.type === "header") {
        return <Header form={form} />
    }
}
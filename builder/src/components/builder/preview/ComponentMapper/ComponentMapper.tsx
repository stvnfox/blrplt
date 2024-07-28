import { FunctionComponent } from "react"

import { ComponentKey } from "@/lib/components/types"

import { ComponentSwitcher } from "./components/ComponentSwitcher"

export type BuilderComponent = {
    order: number
    type: ComponentKey
    data: any
}

type ComponentMapperProps = {
    components: BuilderComponent[]
    slug: string
}

export const ComponentMapper: FunctionComponent<ComponentMapperProps> = ({ components, slug }) => {
    return (
        <section className="space-y-4">
            {components.map((component, index) => {
                return (
                    <ComponentSwitcher
                        key={`component-${component.type}-${index}`}
                        component={component}
                        slug={slug}
                    />
                )
            })}
        </section>
    )
}

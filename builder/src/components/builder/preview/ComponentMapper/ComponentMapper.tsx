import { FunctionComponent } from "react"

import { ComponentElementInstance } from "../../dashboard/Dashboard/ComponentElements/Component"

import { ComponentSwitcher } from "./components/ComponentSwitcher"

type ComponentMapperProps = {
    components: ComponentElementInstance[]
}

export const ComponentMapper: FunctionComponent<ComponentMapperProps> = ({ components }) => {
    return (
        <section className="container space-y-4">
            {components.map((component, index) => {
                return (
                    <ComponentSwitcher
                        key={`component-${component.type}-${index}`}
                        component={component}
                    />
                )
            })}
        </section>
    )
}

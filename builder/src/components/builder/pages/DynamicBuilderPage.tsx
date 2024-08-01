import { FunctionComponent } from "react"
import { ComponentMapper } from "../blocks/Dashboard/ComponentMapper/ComponentMapper"

type DynamicBuilderPageProps = {
    data: any
}

export const DynamicBuilderPage: FunctionComponent<DynamicBuilderPageProps> = (props) => {
    const { data } = props

    return (
        <section className="flex flex-col flex-grow">
            <ComponentMapper components={data.components} slug={data.name}/>
        </section>
    )
}
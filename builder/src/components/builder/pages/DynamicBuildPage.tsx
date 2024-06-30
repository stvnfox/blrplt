"use server"

import { FunctionComponent } from "react"
import { Header } from "../blocks/Header/Header"

type DynamicBuildPageProps = {
    user: string
    data: any
}

export const DynamicBuildPage: FunctionComponent<DynamicBuildPageProps> = (props) => {
    const { user, data } = props

    return (
        <section className="flex-grow">
            <h1 className="text-4xl mb-2">{data.name}</h1>
            <Header data={data.components[0]} slug={data.name} />
        </section>
    )
}
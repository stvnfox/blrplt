"use server"

import { FunctionComponent } from "react"
import { Header } from "../blocks/Header/Header"

type DynamicBuildPageProps = {
    user: string
    data: any
}

export const DynamicBuildPage: FunctionComponent<DynamicBuildPageProps> = (props) => {
    const { data } = props

    return (
        <section className="flex-grow">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl mb-2">{data.name}</h1>
                <a href="/preview/blrplt-preview" target="_blank">
                    Preview page
                </a>
            </div>
            <Header data={data.components[0]} slug={data.name} />
        </section>
    )
}
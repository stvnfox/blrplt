import { FunctionComponent } from "react"

import { CustomHeaderInstance } from "../../dashboard/Dashboard/ComponentElements/components/Header/Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

type HeaderProps = {
    instance: ComponentElementInstance
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ instance }) => {
    const data = instance as CustomHeaderInstance
    const { title, subtitle, description } = data.extraAttributes

    return (
        <header className="mt-2 rounded-2xl sm:rounded-[32px] bg-neutral-200 py-6 md:py-12 sm:mt-8 sm:pb-12 sm:pt-40 md:pt-48">
            <div className="px-6 md:px-12 lg:w-1/2">
                <h2 className="mb-5 w-fit rounded-full bg-primary px-3 py-1.5 text-background md:mb-2 md:text-sm">
                    {subtitle}
                </h2>
                <h1 className="mb-1 text-balance text-3xl text-primary md:mb-4 md:text-6xl">{title}</h1>
                <p className="text text-balance text-baseText">{description}</p>
            </div>
        </header>
    )
}

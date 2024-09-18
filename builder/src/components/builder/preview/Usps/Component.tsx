import { FunctionComponent } from "react"

import { CustomUspsInstance } from "../../dashboard/Dashboard/ComponentElements/components/Usps/Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

import { UspItemComponent as UspItem } from "./components/UspItem"

type UspsProps = {
    instance: ComponentElementInstance
}

export const UspsComponent: FunctionComponent<UspsProps> = ({ instance }) => {
    const data = instance as CustomUspsInstance
    const { title, items } = data.extraAttributes

    return (
            <div className="py-12 md:py-24">
                <div className="mb-12 text-center">
                    <h2 className="title-font mb-4 text-2xl font-medium text-baseText sm:text-3xl">{title}</h2>
                    <div className="mt-6 flex justify-center">
                        <div className="inline-flex h-1 w-16 rounded-full bg-primary"></div>
                    </div>
                </div>
                <div className="flex flex-wrap space-y-6 md:space-y-0 gap-x-12 justify-center">
                    {items.map((item, index) => {
                        return (
                            <UspItem
                                key={`usp-item-${index}`}
                                item={item}
                            />
                        )
                    })}
                </div>
                {/* <button className="mx-auto mt-16 flex rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
                    Button
                </button> */}
            </div>
    )
}

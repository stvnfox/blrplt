import { FunctionComponent } from "react"

import { Usps } from "@/lib/components/types"

import { UspItemComponent as UspItem } from "./components/UspItem"

type UspsProps = {
    data: Usps
}

export const UspsComponent: FunctionComponent<UspsProps> = ({ data }) => {
    return (
        <section className="body-font text-gray-600">
            <div className="container mx-auto px-5 py-24">
                <div className="mb-20 text-center">
                    <h2 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">{data.title}</h2>
                    <div className="mt-6 flex justify-center">
                        <div className="inline-flex h-1 w-16 rounded-full bg-indigo-500"></div>
                    </div>
                </div>
                <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0 justify-center">
                    {data.items.map((item, index) => {
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
        </section>
    )
}

import { Pricing } from "@/lib/components/types"
import { FunctionComponent } from "react"
import { PricingItemComponent } from "./components/PricingItem"

type PricingComponentProps = {
    data: Pricing
}

export const PricingComponent: FunctionComponent<PricingComponentProps> = ({ data }) => {
    return (
        <section className="body-font overflow-hidden text-gray-600">
            <div className="container mx-auto px-5 py-24">
                <div className="mb-20 flex w-full flex-col text-center">
                    <h1 className="title-font mb-2 text-3xl font-medium text-gray-900 sm:text-4xl">{data.title}</h1>
                    <p className="mx-auto text-base leading-relaxed text-gray-500 lg:w-2/3">{data.description}</p>
                </div>
                <div className="-m-4 flex flex-wrap justify-center">
                    {data.items.map((item, index) => {
                        return (
                            <PricingItemComponent
                                key={`pricing-item-${index}`}
                                item={item}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

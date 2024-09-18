import { FunctionComponent } from "react"

import { CustomPricingInstance } from "../../dashboard/Dashboard/ComponentElements/components/Pricing/Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

import { PricingItemComponent } from "./components/PricingItem"

type PricingComponentProps = {
    instance: ComponentElementInstance
}

export const PricingComponent: FunctionComponent<PricingComponentProps> = ({ instance }) => {
    const data = instance as CustomPricingInstance
    const { title, description, items } = data.extraAttributes

    return (
        <section className="overflow-hidden">
            <div className="py-12 md:py-24">
                <div className="mb-10 md:mb-20 flex w-full flex-col text-center">
                    <h2 className="title-font mb-2 text-3xl font-medium text-primary sm:text-4xl">{title}</h2>
                    <p className="mx-auto leading-relaxed text-baseText lg:w-2/3 mt-2">{description}</p>
                </div>
                <div className="-m-4 flex flex-wrap justify-center">
                    {items.map((item, index) => {
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

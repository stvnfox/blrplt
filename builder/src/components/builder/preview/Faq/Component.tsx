import { FunctionComponent } from "react"

import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { CustomFaqInstance } from "../../dashboard/Dashboard/ComponentElements/components/Faq/Component"

import { FaqItemComponent } from "./components/FaqItem"

type FaqComponentProps = {
    instance: ComponentElementInstance
}

export const FaqComponent: FunctionComponent<FaqComponentProps> = ({ instance }) => {
    const data = instance as CustomFaqInstance
    const { title, description, items } = data.extraAttributes

    return (
        <section className="py-12 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2
                        className=
                            "font-manrope text-center text-4xl font-bold leading-[3.25rem] text-primary"
                        
                    >
                        {title}
                    </h2>
                    <p className="mt-4 text-center text-baseText">{description}</p>
                </div>
                <div
                    className="accordion-group"
                    data-accordion="default-accordion"
                >
                    {items.map((item, index) => (
                        <FaqItemComponent
                            key={`faq-item-${index}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

import { FunctionComponent } from "react"

import { Faq } from "@/lib/components/types"

import { FaqItemComponent } from "./components/FaqItem"

type FaqComponentProps = {
    data: Faq
}

export const FaqComponent: FunctionComponent<FaqComponentProps> = ({ data }) => {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2
                        className=
                            "font-manrope text-center text-4xl font-bold leading-[3.25rem] text-primary"
                        
                    >
                        {data.title}
                    </h2>
                    <p className="mt-4 text-center text-baseText">{data.description}</p>
                </div>
                <div
                    className="accordion-group"
                    data-accordion="default-accordion"
                >
                    {data.items.map((item, index) => (
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

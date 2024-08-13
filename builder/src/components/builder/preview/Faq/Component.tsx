import { FunctionComponent } from "react"

import { Faq } from "@/lib/components/types"
import { getBackgroundColor, getHeadingColor, getTextColor } from "@/lib/components/defaultValues"
import { cn } from "@/lib/utils"

import { FaqItemComponent } from "./components/FaqItem"

type FaqComponentProps = {
    data: Faq
}

export const FaqComponent: FunctionComponent<FaqComponentProps> = ({ data }) => {
    return (
        <section className={cn("py-24", getBackgroundColor(data.backgroundColor))}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2
                        className={cn(
                            "font-manrope text-center text-4xl font-bold leading-[3.25rem]",
                            getHeadingColor(data.headingColor)
                        )}
                    >
                        {data.title}
                    </h2>
                    <p className={cn("mt-4 text-center text-base", getTextColor(data.textColor))}>{data.description}</p>
                </div>
                <div
                    className="accordion-group"
                    data-accordion="default-accordion"
                >
                    {data.items.map((item, index) => (
                        <FaqItemComponent
                            key={`faq-item-${index}`}
                            item={item}
                            bgColor={data.backgroundColor}
                            textColor={data.textColor}
                            headingColor={data.headingColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

import { FunctionComponent } from "react"

import { CustomPricingInstance } from "./Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

import { Label } from "@/components/ui/label"

type PricingDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<PricingDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomPricingInstance
    const { label, helperText, title, description, items } = data.extraAttributes

    return (
        <div className="rounded-md border-2 border-neutral-200 bg-white p-4">
            <Label className="mb-2 font-semibold">{label}</Label>
            {helperText && <p className="text-xs text-neutral-500">{helperText}</p>}

            <div className="mt-4 flex w-full flex-col items-center gap-2 rounded-md bg-neutral-200 p-4">
                <p className="text-balance text-xl text-primary md:text-3xl">{title}</p>
                <p className="text text-balance text-baseText">{description}</p>
                <div className="flex flex-wrap justify-center">
                    {items.map((item, index) => {
                        return (
                            <div
                                key={`pricing-item-${index}`}
                                className="w-full p-4 lg:w-48"
                            >
                                <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-primary p-3">
                                    <h4 className="title-font text-sm font-medium tracking-widest">{item.title}</h4>
                                    <h3 className="mb-2 flex items-center border-b border-primary pb-4 text-xl leading-none text-primary">
                                        <span>
                                            {item.currency} {item.price} {item.mostPopular}
                                        </span>
                                    </h3>
                                    {item.includes.map((include, index) => (
                                        <p
                                            key={`pricing-include-${index}`}
                                            className="mb-2 flex flex-grow items-start text-sm text-gray-600"
                                        >
                                            <span className="mr-1 mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-background">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>
                                            {include}
                                        </p>
                                    ))}
                                    {item.mostPopular && (
                                        <span className="text-xs font-semibold uppercase tracking-widest text-background">
                                            Most popular
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

import { FunctionComponent } from "react"

import { PricingItem } from "@/lib/components/types"

type PricingItemProps = {
    item: PricingItem
}

export const PricingItemComponent: FunctionComponent<PricingItemProps> = ({ item }) => (
    <div className="w-full p-4 md:w-1/2 xl:w-1/4">
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-primary p-6">
            {item.mostPopular}
            {item.mostPopular && (
                <span className="absolute right-0 top-0 rounded-bl bg-primary px-3 py-1 text-xs uppercase tracking-widest text-background">
                    Most popular
                </span>
            )}
            <h4 className="title-font mb-1 text-sm font-medium tracking-widest">{item.title}</h4>
            <h3 className="mb-4 flex items-center border-b border-primary pb-4 text-5xl leading-none text-primary">
                <span>${item.price} {item.mostPopular}</span>
                {/* <span className="ml-1 text-lg font-normal text-gray-500">/mo</span> */}
            </h3>
            {item.includes.map((include, index) => (
                <p
                    key={`pricing-include-${index}`}
                    className="mb-2 flex items-start text-gray-600 flex-grow"
                >
                    <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-background">
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
            {/* TODO: Add button text/link/description text */}
            {/* <button className="mt-6 flex w-full items-center rounded border-0 bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none">
            Button
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="ml-auto h-4 w-4"
                viewBox="0 0 24 24"
            >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
        </button> */}
            {/* <p className="mt-3 text-xs text-gray-500">Literally you probably haven't heard of them jean shorts.</p> */}
        </div>
    </div>
)

import { FunctionComponent } from "react"

import { UspItem } from "@/lib/components/types"

type UspItemProps = {
    item: UspItem
}

export const UspItemComponent: FunctionComponent<UspItemProps> = ({ item }) => {
    return (
        <div className="flex flex-col items-center text-center w-full md:w-[300px] md:min-w-[300px]">
            <div className="flex-grow border-neutral-200 rounded-xl border-2 border-primary pt-10 pb-16 px-8">
                <h2 className="mb-3 text-lg font-medium text-primary text-pretty">{item.title}</h2>
                <p className="leading-relaxed text-baseText">
                    {item.description}
                </p>
                {/* <a className="mt-3 inline-flex items-center text-indigo-500">
                    Learn More
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="ml-2 h-4 w-4"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a> */}
            </div>
        </div>
    )
}

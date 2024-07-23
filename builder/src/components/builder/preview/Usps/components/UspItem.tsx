import { FunctionComponent } from "react"

import { UspItem } from "@/lib/components/types"

type UspItemProps = {
    item: UspItem
}

export const UspItemComponent: FunctionComponent<UspItemProps> = ({ item }) => {
    return (
        <div className="flex flex-col items-center p-4 text-center md:w-1/3">
            <div className="mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-10 w-10"
                    viewBox="0 0 24 24"
                >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
            </div>
            <div className="flex-grow">
                <h2 className="title-font mb-3 text-lg font-medium text-gray-900">{item.title}</h2>
                <p className="text-base leading-relaxed">
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

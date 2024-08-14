import { FunctionComponent, useState } from "react"

import { FaqItem } from "@/lib/components/types"

type FaqItemComponentProps = {
    item: FaqItem
}

export const FaqItemComponent: FunctionComponent<FaqItemComponentProps> = ({ item }) => {
    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <div
            className="active mb-8 rounded-xl border border-solid p-4 transition duration-500"
            id={`${item.id}-item`}
        >
            <button
                className="group inline-flex w-full items-center justify-between text-left text-lg font-normal leading-8 transition duration-500"
                id={`${item.id}-item`}
                onClick={() => setShowAnswer(!showAnswer)}
            >
                <h5 className="text-textBase">{item.question}</h5>
                {!showAnswer ? (
                    <svg
                        className="block h-6 w-6 origin-center transition duration-500 group-hover:text-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12H18M12 18V6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6 text-gray-900 transition duration-500 group-hover:text-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12H18"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                )}
            </button>
            {showAnswer && (    
                <div
                    id={`${item.id}-item-collapse`}
                    className="w-full overflow-hidden pr-4 mt-2"
                >
                    <p className="text-base font-normal leading-6">
                        {item.answer}
                    </p>
                </div>
            )}
        </div>
    )
}
